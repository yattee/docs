---
sidebar_position: 2
title: "Reverse Proxy"
---

import ScreenshotPlaceholder from '@site/src/components/ScreenshotPlaceholder';

# Reverse Proxy

Running Yattee Server behind a reverse proxy allows you to:

- Serve traffic over **HTTPS** with a valid TLS certificate
- Use a **custom domain name** (e.g., `yattee.example.com`)
- Integrate with other self-hosted services on the same host
- Add additional authentication or rate-limiting layers

Yattee Server reads the `X-Forwarded-Proto` header to determine whether the original client connection used HTTPS. This ensures that generated URLs and cookie security settings work correctly when the server itself listens on plain HTTP behind a TLS-terminating proxy.

## General Configuration

When placing Yattee Server behind an HTTPS reverse proxy, keep the following settings in mind:

- **`SECURE_COOKIES=true`** (the default) -- Leave this enabled so session cookies are marked `Secure` and only sent over HTTPS.
- **`CORS_ORIGINS`** -- If the Yattee client connects from a different origin than the server, set this to the client's origin (e.g., `CORS_ORIGINS=https://your-domain.com`). Multiple origins can be specified as a comma-separated list.
- **Proxy buffering** -- Disable proxy buffering so that video streams are forwarded to the client immediately rather than being buffered in memory on the proxy.

:::warning Video Streaming
Disabling proxy buffering is important for video playback. Without it, the reverse proxy may attempt to buffer the entire video response before forwarding it to the client, which causes playback delays and excessive memory usage.
:::

## nginx

The following nginx configuration proxies all traffic to Yattee Server with the correct headers for HTTPS and streaming:

```nginx
server {
    listen 443 ssl http2;
    server_name yattee.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8085;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Required for streaming
        proxy_buffering off;
        proxy_request_buffering off;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}
```

:::tip
If you also want to redirect HTTP to HTTPS, add a separate `server` block:

```nginx
server {
    listen 80;
    server_name yattee.example.com;
    return 301 https://$host$request_uri;
}
```
:::

## Caddy

[Caddy](https://caddyserver.com/) provides automatic HTTPS out of the box, making the configuration much simpler:

```caddy
yattee.example.com {
    reverse_proxy localhost:8085
}
```

Caddy automatically obtains and renews TLS certificates via Let's Encrypt, sets the appropriate proxy headers, and handles HTTP-to-HTTPS redirection. No additional configuration is needed for most deployments.

## Docker Compose with a Reverse Proxy Network

If your reverse proxy also runs in Docker (common with setups like nginx-proxy, Traefik, or Caddy in a container), you can connect Yattee Server to a shared Docker network instead of publishing ports to the host:

```yaml
services:
  yattee-server:
    image: yattee/yattee-server:latest
    container_name: yattee-server
    volumes:
      - downloads:/downloads
      - data:/app/data
    networks:
      - proxy
      - default
    restart: unless-stopped

volumes:
  downloads:
  data:

networks:
  proxy:
    external: true
```

In this setup:

- The `proxy` network is a pre-existing external network that your reverse proxy container is also attached to.
- No `ports` mapping is needed because the reverse proxy communicates with Yattee Server directly over the Docker network.
- Use `http://yattee-server:8085` as the upstream address in your reverse proxy configuration (the container name resolves via Docker DNS).

:::note
When using an external Docker network, make sure to create it first:

```bash
docker network create proxy
```
:::

## CORS Configuration

If the Yattee app or web client is served from a different domain than the server API, you need to configure CORS to allow cross-origin requests. Set the `CORS_ORIGINS` environment variable to the origin(s) that should be permitted:

```yaml
environment:
  - CORS_ORIGINS=https://app.example.com,https://other.example.com
```

For local development, you can temporarily allow all origins:

```yaml
environment:
  - CORS_ALLOW_ALL=true
```

:::warning
Do not use `CORS_ALLOW_ALL=true` in production. It disables origin checks entirely, which can expose your server to cross-site request attacks.
:::

## Next Steps

- [Docker Setup](./docker.md) -- Environment variables and volume configuration
- [Setup Wizard](./setup-wizard.md) -- Create your admin account after deployment
