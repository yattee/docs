---
sidebar_position: 3
title: "Security & Privacy"
---

# Security & Privacy

Yattee Server is designed to be self-hosted and may be exposed to the internet. This page documents the security model, authentication mechanisms, and privacy protections built into the server.

## Authentication

Yattee Server uses a layered authentication model with three distinct mechanisms.

### HTTP Basic Auth

All API requests require HTTP Basic Authentication after the initial setup is complete. Basic Auth is activated as soon as the first user account is created during the [setup wizard](./setup/setup-wizard.md).

Every authenticated request must include the `Authorization: Basic <base64(username:password)>` header. On authentication failure, the server responds with:

```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Yattee Server"
```

:::note
The `/health` endpoint is always public and does not require authentication. The `/info` endpoint returns minimal information (`{"name": "yattee-server"}`) without authentication, and full server details only with valid credentials.
:::

### HMAC-Signed Stream Tokens

For proxied streams, thumbnails, and captions, Yattee Server uses HMAC-signed tokens instead of Basic Auth. This allows media players and image loaders that do not support Basic Auth to access content securely.

Each token encodes:

- **user_id** -- the user who requested the stream
- **video_id** -- the specific video being accessed
- **expiry** -- tokens are valid for **24 hours** from generation

The HMAC signing key is auto-generated on first startup and stored at:

```
{DATA_DIR}/.stream_token_secret
```

Tokens are generated server-side and included in stream URLs returned by the API. Clients never need to construct tokens themselves.

### Rate Limiting

Failed authentication attempts are tracked per IP address to prevent brute-force attacks.

| Setting | Default | Description |
|---------|---------|-------------|
| `rate_limit_window` | 60 seconds | Time window for counting failures |
| `rate_limit_max_failures` | 5 | Maximum failures before lockout |

When the limit is exceeded, the server responds with:

```
HTTP/1.1 429 Too Many Requests
```

The lockout expires automatically after the `rate_limit_window` period elapses.

## SSRF Protection

All user-supplied URLs are validated through DNS resolution checks to prevent Server-Side Request Forgery (SSRF) attacks. The server blocks requests to:

- **Loopback addresses** (e.g., `127.0.0.0/8`, `::1`)
- **Private network ranges** (e.g., `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`)
- **Link-local addresses** (e.g., `169.254.0.0/16`, `fe80::/10`)
- **Reserved and multicast addresses**
- **Dangerous hostnames**: `localhost`, `metadata.google.internal`, `169.254.169.254` (cloud metadata services)
- **Dangerous suffixes**: `.internal`, `.local`, `.localhost`

:::info Tailscale and CGNAT compatibility
The CGNAT range `100.64.0.0/10` (used by Tailscale and other overlay networks) is **allowed** through the SSRF filter, so you can use Yattee Server within a Tailscale network without issues.
:::

## Security Headers

Every HTTP response from Yattee Server includes the following security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents browsers from MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Prevents the page from being embedded in iframes |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer information sent to other origins |

## CORS Configuration

Cross-Origin Resource Sharing (CORS) controls which web origins can make requests to the server. Three modes are available:

### Specific Origins (Recommended)

Set `CORS_ORIGINS` to a comma-separated list of allowed origins:

```bash
CORS_ORIGINS=https://yattee.example.com,https://app.example.com
```

Only listed origins will be able to make cross-origin requests, and credentials (cookies, auth headers) are supported.

### Allow All (Development Only)

```bash
CORS_ALLOW_ALL=true
```

:::warning
When `CORS_ALLOW_ALL=true`, the server responds with `Access-Control-Allow-Origin: *`. Per the CORS specification, **credentials are not allowed** with wildcard origins. This mode is intended only for local development and testing.
:::

### Disabled (Default)

When neither `CORS_ORIGINS` nor `CORS_ALLOW_ALL` is set, CORS headers are not added to responses. Cross-origin browser requests will be blocked by the browser's same-origin policy.

## Credential Encryption

Sensitive credential values (cookie files) are encrypted at rest using **Fernet symmetric encryption** (AES-128-CBC + HMAC-SHA256). The encryption key is auto-generated on first startup and stored with restricted permissions.

Credential values are never returned in API responses -- only a `has_value: true/false` flag is exposed.

For full details on credential types, encryption key management, and cookie handling, see [Credentials & Security](./admin/credentials.md).

## Log Redaction

Yattee Server automatically redacts sensitive information in log output. When yt-dlp commands are logged, the `--cookies` flag and its value are replaced with `[REDACTED]`.

This prevents credentials from leaking into log files, container logs, or monitoring systems.

## Cookie Security

The server uses the `SECURE_COOKIES` setting to control whether cookies require HTTPS:

| Value | Behavior |
|-------|----------|
| `true` (default) | Cookies are marked `Secure` and only sent over HTTPS |
| `false` | Cookies work over plain HTTP |

:::tip
Keep `SECURE_COOKIES=true` for any deployment accessible over a network. Only set it to `false` for local development on `localhost` without TLS.
:::

## Data Storage

All persistent data is stored in the `DATA_DIR` directory:

- **SQLite database** -- user accounts, site configurations, feed data
- **`.encryption_key`** -- Fernet encryption key for credentials
- **`.stream_token_secret`** -- HMAC signing key for stream tokens

:::danger Back up your DATA_DIR
The encryption key and stream token secret are critical. If lost, encrypted credentials become unrecoverable and all active stream tokens are invalidated. Include the entire `DATA_DIR` in your regular backup routine.
:::

## Network Binding

By default, Yattee Server binds to `0.0.0.0` (all network interfaces). This is appropriate for Docker deployments where the container network handles isolation.

For direct installations or public-facing deployments, place Yattee Server behind a **reverse proxy** (Nginx, Caddy, Traefik) that handles TLS termination, additional rate limiting, and access control. See the [Reverse Proxy guide](./setup/reverse-proxy.md) for configuration examples.
