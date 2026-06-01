# CI/CD setup — portable guide

How the GitHub Actions CI/CD in this repo works, and how to copy it into a sibling
repo (e.g. `charging-ev-app`). The two repos share the same stack — Bun monorepo,
Express+Prisma server, Vite SPAs — so the pipeline ports over with only a few edits.

**Architecture**

```
<frontend workspaces> → build → S3 → CloudFront   (static SPAs, one bucket+distribution each)
server (Bun monorepo) → EC2: git pull + prisma migrate deploy + `systemctl restart` (no Docker)
media → s3://<media bucket>   (runtime upload target, server/src/lib/storage.ts — unchanged)
```

- **CI** (`ci.yml`) — every PR + push to `main`: lint + typecheck. Gate, no deploy.
- **Deploy** (`deploy.yml`) — push to `main`: build+sync each frontend to S3 (then CloudFront
  invalidate), and SSH to EC2 to pull+migrate+restart the server unit.

---

## What changes between repos

| Thing | `trio-ev-app` | `charging-ev-app` |
| --- | --- | --- |
| Frontend workspaces | `client`, `admin` | `client`, `client2`, `admin` |
| Deploy matrix | `[client, admin]` | `[client, client2, admin]` |
| Per-frontend secrets | `*_CLIENT_*`, `*_ADMIN_*` | `*_CLIENT_*`, `*_CLIENT2_*`, `*_ADMIN_*` |
| Server / env / systemd | identical | identical |

Each frontend workspace = one S3 bucket + one CloudFront distribution + two secrets
(`S3_<APP>_BUCKET`, `CLOUDFRONT_<APP>_ID`). Everything else is the same.

The `deploy.yml` below is written so adding/removing a frontend = edit the `matrix.app`
list **and** add a matching `S3_<app>` / `CF_<app>` line to the job `env`. No other logic
changes (it resolves the right secret by app name via bash indirect expansion).

---

## 1. `.github/workflows/ci.yml`

Identical for both repos.

```yaml
name: CI

on:
    pull_request:
    push:
        branches: [main]

concurrency:
    group: ci-${{ github.ref }}
    cancel-in-progress: true

jobs:
    check:
        name: Lint + typecheck
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: oven-sh/setup-bun@v2
              with:
                  bun-version: 1.3.1
            - name: Install deps
              run: bun install --frozen-lockfile
            - name: Generate Prisma client
              run: bun run --cwd server db:generate
            - name: Lint
              run: bun run lint
            - name: Typecheck server
              run: bun run --cwd server typecheck
            - name: Typecheck client
              run: bun run --cwd client typecheck
            # charging-ev-app: add this line
            # - name: Typecheck client2
            #   run: bun run --cwd client2 typecheck
            - name: Typecheck admin
              run: bun run --cwd admin typecheck
```

---

## 2. `.github/workflows/deploy.yml`

Below is the **charging-ev-app** version (3 frontends). For trio, drop `client2` from
the matrix and drop the `S3_client2` / `CF_client2` env lines.

```yaml
name: Deploy

on:
    push:
        branches: [main]
    workflow_dispatch:

concurrency:
    group: deploy-production
    cancel-in-progress: false

env:
    BUN_VERSION: 1.3.1

jobs:
    # ── Frontends → S3 + CloudFront ─────────────────────────────
    frontends:
        name: Deploy ${{ matrix.app }} → S3
        runs-on: ubuntu-latest
        strategy:
            fail-fast: false
            matrix:
                app: [client, client2, admin] # trio: [client, admin]
        # Map every frontend's bucket + distribution secret here. The step
        # below picks the right one by ${{ matrix.app }} (bash indirect expansion),
        # so this scales to any number of frontends without touching the script.
        env:
            S3_client: ${{ secrets.S3_CLIENT_BUCKET }}
            S3_client2: ${{ secrets.S3_CLIENT2_BUCKET }}
            S3_admin: ${{ secrets.S3_ADMIN_BUCKET }}
            CF_client: ${{ secrets.CLOUDFRONT_CLIENT_ID }}
            CF_client2: ${{ secrets.CLOUDFRONT_CLIENT2_ID }}
            CF_admin: ${{ secrets.CLOUDFRONT_ADMIN_ID }}
        steps:
            - uses: actions/checkout@v4
            - uses: oven-sh/setup-bun@v2
              with:
                  bun-version: ${{ env.BUN_VERSION }}
            - name: Install deps
              run: bun install --frozen-lockfile

            # VITE_API_URL is baked into the bundle at build time.
            - name: Build ${{ matrix.app }}
              env:
                  VITE_API_URL: ${{ secrets.VITE_API_URL }}
              run: bun run --cwd ${{ matrix.app }} build

            - name: Configure AWS credentials
              uses: aws-actions/configure-aws-credentials@v4
              with:
                  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  aws-region: ${{ secrets.AWS_REGION }}

            - name: Sync to S3 + invalidate CloudFront
              run: |
                  set -euo pipefail
                  app="${{ matrix.app }}"
                  bvar="S3_${app}";  bucket="${!bvar}"
                  cvar="CF_${app}";  dist="${!cvar}"

                  # Hashed assets: long immutable cache. index.html: no-cache so new deploys are seen.
                  aws s3 sync "${app}/dist" "s3://${bucket}" \
                      --delete \
                      --cache-control "public,max-age=31536000,immutable" \
                      --exclude "index.html" --exclude "*.map"
                  aws s3 cp "${app}/dist/index.html" "s3://${bucket}/index.html" \
                      --cache-control "no-cache"

                  aws cloudfront create-invalidation --distribution-id "${dist}" --paths "/*"

    # ── Server → EC2 (systemd, no Docker) ───────────────────────
    server-deploy:
        name: Deploy server → EC2
        runs-on: ubuntu-latest
        steps:
            - name: Pull, migrate, restart
              uses: appleboy/ssh-action@v1.2.0
              env:
                  SHA: ${{ github.sha }}
                  APP_DIR: ${{ secrets.EC2_APP_DIR }}
              with:
                  host: ${{ secrets.EC2_HOST }}
                  username: ${{ secrets.EC2_USER }}
                  key: ${{ secrets.EC2_SSH_KEY }}
                  envs: SHA,APP_DIR
                  script: |
                      set -euo pipefail
                      # Non-interactive SSH shell: put bun on PATH.
                      export BUN_INSTALL="$HOME/.bun"
                      export PATH="$BUN_INSTALL/bin:$PATH"
                      cd "${APP_DIR:-$HOME/charging-ev-app}"   # trio: trio-ev-app
                      git fetch --all --prune
                      git reset --hard "$SHA"
                      bun install --frozen-lockfile
                      bun run --cwd server db:generate
                      ( cd server && bunx prisma migrate deploy )
                      sudo systemctl restart <UNIT>            # e.g. charging-server
                      sudo systemctl --no-pager status <UNIT> | head -n 5
```

---

## 3. GitHub secrets

Repo → Settings → Secrets and variables → Actions. Set with `gh`:

### Frontends (S3 + CloudFront) — one bucket+distribution per frontend

| Secret | What |
| --- | --- |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | IAM user — `s3:PutObject/DeleteObject/ListBucket` on the buckets + `cloudfront:CreateInvalidation` on the distributions |
| `AWS_REGION` | e.g. `ap-south-1` |
| `S3_CLIENT_BUCKET`, `S3_CLIENT2_BUCKET`, `S3_ADMIN_BUCKET` | bucket name per frontend |
| `CLOUDFRONT_CLIENT_ID`, `CLOUDFRONT_CLIENT2_ID`, `CLOUDFRONT_ADMIN_ID` | distribution ID (`E…`) per frontend |
| `VITE_API_URL` | public HTTPS URL of the server (baked into every bundle) |

### Server (EC2, systemd)

| Secret | What |
| --- | --- |
| `EC2_HOST` | Elastic IP / public DNS of the box |
| `EC2_USER` | SSH user (`ec2-user` on Amazon Linux, `ubuntu` on Ubuntu) — owns the cloned repo |
| `EC2_SSH_KEY` | full private key PEM (set from file: `gh secret set EC2_SSH_KEY < key.pem`) |
| `EC2_APP_DIR` | absolute repo path on the box, e.g. `/home/ec2-user/charging-ev-app` |

```bash
# run from the repo so gh targets the right GitHub repo
gh secret set AWS_ACCESS_KEY_ID     --body "…"
gh secret set AWS_SECRET_ACCESS_KEY --body "…"
gh secret set AWS_REGION            --body "ap-south-1"
gh secret set VITE_API_URL          --body "https://api.example.com"

gh secret set S3_CLIENT_BUCKET   --body "…"
gh secret set S3_CLIENT2_BUCKET  --body "…"
gh secret set S3_ADMIN_BUCKET    --body "…"
gh secret set CLOUDFRONT_CLIENT_ID   --body "E…"
gh secret set CLOUDFRONT_CLIENT2_ID  --body "E…"
gh secret set CLOUDFRONT_ADMIN_ID    --body "E…"

gh secret set EC2_HOST    --body "13.205.138.155"
gh secret set EC2_USER    --body "ec2-user"
gh secret set EC2_SSH_KEY < ~/Downloads/your-key.pem
gh secret set EC2_APP_DIR --body "/home/ec2-user/charging-ev-app"
```

---

## 4. One-time AWS setup (per frontend)

Do once per frontend workspace (`client`, `client2`, `admin`).

1. **Bucket** (private — serve via CloudFront OAC, not S3 website hosting):
   `aws s3 mb s3://<bucket> --region <region>`
2. **CloudFront distribution** (Console):
   - Origin domain → the bucket's `*.s3.<region>.amazonaws.com` (NOT the website endpoint)
   - Origin access → **Origin access control (OAC)** → create new → use it
   - Default root object → `index.html`; Viewer → Redirect HTTP→HTTPS
   - After create, **Copy policy** banner → paste into the bucket policy so CloudFront can read it
3. **SPA deep-link fix** (required): distribution → **Error pages** → add custom responses:
   `403 → /index.html (200)` and `404 → /index.html (200)`. Without these, deep links 404.
4. **Get the ID**: distribution detail → **Distribution ID** (`E…`) → that's `CLOUDFRONT_<APP>_ID`.

List existing distributions + match by origin:
```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[].{id:Id,domain:DomainName,origin:Origins.Items[0].DomainName}" \
  --output table
```

---

## 5. One-time EC2 setup

Box already has the repo cloned + Bun installed. Remaining wiring (Amazon Linux 2023,
user `ec2-user` — adjust paths for Ubuntu/`ubuntu`):

1. **`server/.env`** (chmod 600, never committed) — runtime config the unit loads:

    ```env
    DATABASE_URL=postgresql://postgres:<pw>@localhost:5432/<db>?schema=public
    JWT_SECRET=<>=16 chars>
    JWT_EXPIRES_IN=7d
    CORS_ORIGIN=https://app.example.com,https://app2.example.com,https://admin.example.com
    LOG_LEVEL=info
    S3_REGION=<media region>
    S3_BUCKET=<media bucket>
    S3_ACCESS_KEY_ID=<>
    S3_SECRET_ACCESS_KEY=<>
    S3_FORCE_PATH_STYLE=false
    ```

   `CORS_ORIGIN` = comma-separated CloudFront domains of **all** frontends.

2. **systemd unit** `/etc/systemd/system/<unit>.service` (e.g. `charging-server`):

    ```ini
    [Unit]
    Description=Charging API server
    After=network.target

    [Service]
    Type=simple
    User=ec2-user
    WorkingDirectory=/home/ec2-user/charging-ev-app/server
    EnvironmentFile=/home/ec2-user/charging-ev-app/server/.env
    Environment=NODE_ENV=production
    Environment=PORT=8001
    ExecStart=/home/ec2-user/.bun/bin/bun src/index.ts
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```

    Confirm the bun path with `which bun`. Then:
    `sudo systemctl daemon-reload && sudo systemctl enable --now <unit>`

3. **Passwordless restart** for the deploy user (`sudo visudo -f /etc/sudoers.d/deploy`):

    ```
    ec2-user ALL=(root) NOPASSWD: /bin/systemctl restart <unit>, /bin/systemctl status <unit>
    ```

4. **TLS in front of `:8001`** (nginx/Caddy reverse proxy or an ALB) so `VITE_API_URL`
   can be `https://…`.

5. Verify SSH before relying on CI:
   `ssh -i key.pem ec2-user@<host> "cd <app_dir> && git status && which bun"`

---

## Notes / gotchas

- Deploy is `git reset --hard <sha>` — **wipes local edits on the box**. Keep config only
  in `server/.env`, never in tracked files.
- Without the sudoers `NOPASSWD` rule the `systemctl restart` prompts for a password and the
  SSH step hangs/fails.
- `VITE_API_URL` is build-time — changing it requires re-running the deploy (rebuilds bundles).
- Rollback: re-run Deploy via `workflow_dispatch` from an older commit, or on the box
  `git reset --hard <old sha> && sudo systemctl restart <unit>`.
- Each frontend needs its own bucket+distribution; reusing one across SPAs breaks routing.
- **Bun flag order:** use `bun run --cwd <dir> <script>`. The form `bun --cwd <dir> run <script>`
  silently no-ops (prints the script list, exits 0) on bun 1.3.x — a build/typecheck that
  "passes" in 0s but produces nothing.
- The deploy SSH shell is non-interactive, so it doesn't load `~/.bashrc`; bun isn't on PATH
  unless you `export PATH="$HOME/.bun/bin:$PATH"` (done in the script). The systemd unit avoids
  this by calling bun with its absolute path.
