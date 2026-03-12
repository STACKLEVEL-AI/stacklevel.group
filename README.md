# stacklevel.group-codex

## Architecture

- external reverse proxy on the host, if used, forwards traffic to `127.0.0.1:${WEB_HTTP_PORT}`
- `nginx` - public HTTP entrypoint inside the project, exposed only on loopback
- `web` - `Next.js` app behind `nginx`
- `bot-sender` - internal Telegram delivery service built from its own Docker context and reachable only from `web`

No database or Redis is used.

## Routing model

- `nginx` proxies all application traffic to the `web` container
- `Next.js App Router` resolves localized routes under `/ru/*` and `/en/*`
- `/` redirects to the preferred locale from `Accept-Language`
- legacy paths from the old site redirect to the closest current pages:
  - `/react-development` -> `/:locale/hire-react-developers`
  - `/php-development` -> `/:locale/hire-php-developers`

## Environment configuration

All required runtime secrets/configuration are provided via `.env`.

1. Copy `.env.example` to `.env`
2. Set values in `.env`
   - `WEB_HTTP_PORT`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `RECAPTCHA_SECRET_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `RECIPIENT_USER_IDS`
   - `INTERNAL_HMAC_SECRET`

`WEB_HTTP_PORT` defaults to `8020` to stay compatible with the old `StackLevelGroup` host port.

## Run

```bash
docker compose up --build -d
```

The stack is published only on host loopback:

- `http://127.0.0.1:${WEB_HTTP_PORT}`

## External reverse proxy

If the server still uses host Apache for vhost routing and TLS termination, proxy it to:

- `http://127.0.0.1:${WEB_HTTP_PORT}`

The host proxy should preserve:

- `Host`
- `X-Forwarded-Proto`
- `X-Forwarded-Port`

## SSL notes

- the current in-project `nginx` is configured as the HTTP upstream for a host reverse proxy
- if you keep TLS on host Apache, preserve `X-Forwarded-Proto=https` and `X-Forwarded-Port=443` exactly as in the old setup
- if you later move TLS termination into `nginx`, reuse the certificate paths from the old project:
  - `ssl_certificate /path/to/fullchain.pem;`
  - `ssl_certificate_key /path/to/privkey.pem;`

## Security model implemented

- only `nginx` publishes a host port, and only on `127.0.0.1`
- `web` is the only app service connected to both networks: public `app` and private `bot`
- `bot-sender` is isolated on the private `bot` network and is not reachable from `nginx`
- `web` signs requests to `bot-sender` with HMAC (`X-Timestamp`, `X-Signature`)
- `bot-sender` validates timestamp window and idempotency key
- `bot-sender` sends notifications only to `RECIPIENT_USER_IDS`
- `bot-sender` disables Telegram webhook on startup via `deleteWebhook(drop_pending_updates=true)`
