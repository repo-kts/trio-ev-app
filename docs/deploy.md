# Deployment (CI/CD)

Two GitHub Actions workflows:

- **`.github/workflows/ci.yml`** — runs on every PR + push to `main`. Lint + typecheck (server, client, admin). Gate; no deploy.
- **`.github/workflows/deploy.yml`** — runs on push to `main` (and manual `workflow_dispatch`). Two jobs:
    - `frontends` — builds `client/` + `admin/` (`VITE_API_URL` baked in), syncs `dist/` to S3, invalidates CloudFront.
    - `server-deploy` — SSHes into EC2: `git reset --hard <sha>` → `bun install` → `prisma migrate deploy` → `systemctl restart trio-server`.

```
client/dist ─┐
admin/dist  ─┤→ S3 → CloudFront   (static SPA)
             │
server ──────┴─ EC2: git pull + migrate + `systemctl restart trio-server` (bun, no Docker)
media → s3://<media bucket>  (runtime, server/src/lib/storage.ts — unchanged)
```

## Required GitHub secrets

Settings → Secrets and variables → Actions.

### Frontends (S3 + CloudFront)

| Secret | What |
| --- | --- |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | IAM user with `s3:Sync`-level + `cloudfront:CreateInvalidation` on the two buckets/distributions |
| `AWS_REGION` | e.g. `ap-south-1` |
| `S3_CLIENT_BUCKET` / `S3_ADMIN_BUCKET` | bucket names for the client + admin SPAs |
| `CLOUDFRONT_CLIENT_ID` / `CLOUDFRONT_ADMIN_ID` | CloudFront distribution IDs in front of those buckets |
| `VITE_API_URL` | public URL of the server on EC2 (e.g. `https://api.example.com`) — baked into both bundles |

### Server (EC2, systemd)

| Secret | What |
| --- | --- |
| `EC2_HOST` | public DNS / IP of the EC2 box |
| `EC2_USER` | SSH user (e.g. `ubuntu`, `ec2-user`) — must own the cloned repo |
| `EC2_SSH_KEY` | private key (PEM) for that user |
| `EC2_APP_DIR` | absolute path of the cloned repo on the box (optional; defaults to `$HOME/trio-ev-app`) |

No registry — the server runs straight from source via bun under the `trio-server` systemd unit.

## One-time S3 + CloudFront setup (per frontend)

1. Create an S3 bucket (private; serve via CloudFront OAC, not public website hosting).
2. Create a CloudFront distribution with that bucket as origin (Origin Access Control).
3. **SPA routing:** add a custom error response — HTTP `403` and `404` → response page `/index.html`, response code `200`. Without this, deep links (e.g. `/inquiries/123`) 404.
4. `index.html` is uploaded with `no-cache`; hashed assets are `immutable` (handled by the workflow). The workflow invalidates `/*` each deploy.

## One-time EC2 setup

Repo already cloned + bun installed. Remaining wiring:

1. **`.env`** in `server/` (chmod 600, **never committed**) — the runtime config the unit loads:

    ```env
    DATABASE_URL=postgresql://postgres:<strong>@localhost:5432/trio?schema=public
    JWT_SECRET=<>=16 chars>
    JWT_EXPIRES_IN=7d
    # CloudFront domains of the two SPAs, comma-separated
    CORS_ORIGIN=https://app.example.com,https://admin.example.com
    LOG_LEVEL=info
    S3_REGION=<media bucket region>
    S3_BUCKET=<media bucket>
    S3_ACCESS_KEY_ID=<>
    S3_SECRET_ACCESS_KEY=<>
    S3_FORCE_PATH_STYLE=false
    ```

   Postgres is local (RDS or a host package) — point `DATABASE_URL` at it.

2. **systemd unit** `/etc/systemd/system/trio-server.service`:

    ```ini
    [Unit]
    Description=Trio API server
    After=network.target

    [Service]
    Type=simple
    User=<EC2_USER>
    WorkingDirectory=/home/<EC2_USER>/trio-ev-app/server
    EnvironmentFile=/home/<EC2_USER>/trio-ev-app/server/.env
    Environment=NODE_ENV=production
    Environment=PORT=8001
    ExecStart=/home/<EC2_USER>/.bun/bin/bun src/index.ts
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```

    `sudo systemctl daemon-reload && sudo systemctl enable --now trio-server`.

3. **Passwordless restart** — the deploy SSHes as `EC2_USER` and runs `sudo systemctl restart trio-server`. Grant exactly that via a sudoers drop-in (`sudo visudo -f /etc/sudoers.d/trio`):

    ```
    <EC2_USER> ALL=(root) NOPASSWD: /bin/systemctl restart trio-server, /bin/systemctl status trio-server
    ```

   (Or set `User=<EC2_USER>` on the unit and drop `sudo` from the workflow if it can manage its own user service.)

4. Put TLS in front of `:8001` (nginx/Caddy reverse proxy or an ALB) so `VITE_API_URL` can be `https://…`.

## Notes

- Deploy is `git reset --hard <sha>` — local edits on the box are wiped. Keep config only in `server/.env`, never in tracked files.
- Rollback: re-run the deploy workflow on an older commit (manual `workflow_dispatch` from that SHA), or on the box `git reset --hard <old sha> && sudo systemctl restart trio-server`.
- `docker-compose.prod.yml` (all three services in containers on one box) still exists as an alternative single-box deploy.
