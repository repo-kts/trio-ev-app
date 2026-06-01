# Deployment (CI/CD)

Two GitHub Actions workflows:

- **`.github/workflows/ci.yml`** — runs on every PR + push to `main`. Lint + typecheck (server, client, admin). Gate; no deploy.
- **`.github/workflows/deploy.yml`** — runs on push to `main` (and manual `workflow_dispatch`). Three jobs:
    - `frontends` — builds `client/` + `admin/` (`VITE_API_URL` baked in), syncs `dist/` to S3, invalidates CloudFront.
    - `server-image` — builds the server prod image, pushes to GHCR (`ghcr.io/<owner>/trio-server:<sha>` + `:latest`).
    - `server-deploy` — copies `docker-compose.ec2.yml` to EC2, then SSHes in to `pull → migrate deploy → up`.

```
client/dist ─┐                         ┌─ ghcr.io/<owner>/trio-server ─┐
admin/dist  ─┤→ S3 → CloudFront        │                              ↓
             └─ (static SPA)           └─ build/push ──────────→ EC2 (docker compose: server + db)
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

### Server (EC2 + GHCR)

| Secret | What |
| --- | --- |
| `EC2_HOST` | public DNS / IP of the EC2 box |
| `EC2_USER` | SSH user (e.g. `ubuntu`, `ec2-user`) |
| `EC2_SSH_KEY` | private key (PEM) for that user |
| `GHCR_PAT` | PAT with `read:packages` so EC2 can pull the private image (skip if you make the GHCR package public) |

Image push uses the built-in `GITHUB_TOKEN` — no secret needed for that.

## One-time S3 + CloudFront setup (per frontend)

1. Create an S3 bucket (private; serve via CloudFront OAC, not public website hosting).
2. Create a CloudFront distribution with that bucket as origin (Origin Access Control).
3. **SPA routing:** add a custom error response — HTTP `403` and `404` → response page `/index.html`, response code `200`. Without this, deep links (e.g. `/inquiries/123`) 404.
4. `index.html` is uploaded with `no-cache`; hashed assets are `immutable` (handled by the workflow). The workflow invalidates `/*` each deploy.

## One-time EC2 setup

1. Install Docker + the compose plugin.
2. `mkdir ~/trio` — the workflow drops `docker-compose.ec2.yml` here.
3. Create `~/trio/.env` (chmod 600, **never committed**) with:

    ```env
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=<strong>
    POSTGRES_DB=trio
    DATABASE_URL=postgresql://postgres:<strong>@db:5432/trio?schema=public
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

   `db` resolves on the compose network — keep `@db:5432` (not localhost). For managed Postgres (RDS) instead, point `DATABASE_URL` at it and drop the `db` service.
4. Put TLS in front of `:8001` (nginx/Caddy reverse proxy or an ALB) so `VITE_API_URL` can be `https://…`.

## Notes

- The prod server image bundles the Prisma CLI, so `bunx prisma migrate deploy` runs inside the container on EC2 — no Prisma install on the host.
- Rollback: re-run the deploy on an older commit, or on EC2 set `IMAGE_TAG=<old sha>` and re-run the compose `pull && up -d`.
- `docker-compose.prod.yml` (all three services on one box) still exists for a single-box deploy; the EC2 split here supersedes it for production.
