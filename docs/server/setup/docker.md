---
sidebar_position: 1
title: "Docker Setup"
---

import ScreenshotPlaceholder from '@site/src/components/ScreenshotPlaceholder';

# Docker Setup

Yattee Server is a self-hosted video API server powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp). It extracts video streams, proxies playback, and optionally integrates with an Invidious instance to provide search, trending, channel browsing, captions, and thumbnails.

The official Docker image is published to Docker Hub as [`yattee/yattee-server`](https://hub.docker.com/r/yattee/yattee-server) and supports both **linux/amd64** and **linux/arm64** architectures.

## System Requirements

- [Docker](https://docs.docker.com/get-docker/) (20.10 or later recommended)
- [Docker Compose](https://docs.docker.com/compose/install/) v2

## Quick Start

Create a `docker-compose.yml` file:

```yaml
services:
  yattee-server:
    image: yattee/yattee-server:latest
    container_name: yattee-server
    ports:
      - "8085:8085"
    volumes:
      - downloads:/downloads
      - data:/app/data
    restart: unless-stopped

volumes:
  downloads:   # Temporary proxied video files
  data:        # Database and encryption keys
```

Start the server:

```bash
docker compose up -d
```

The server will be available at `http://localhost:8085`. On first launch you will be redirected to the [Setup Wizard](./setup-wizard.md) to create your admin account.

## Volumes

Yattee Server uses two persistent volumes:

| Volume | Container Path | Purpose |
|--------|---------------|---------|
| `downloads` | `/downloads` | Temporary storage for proxied video files during streaming |
| `data` | `/app/data` | SQLite database (`yattee.db`) and encryption key (`.encryption_key`) |

:::warning Data Persistence
The `data` volume is critical. It contains your SQLite database and the encryption key used to protect stored credentials. If you lose this volume, you will need to re-run the setup wizard and re-enter all credentials. **Back up this volume regularly.**
:::

## Environment Variables

All configuration is done through environment variables. The following table lists every available option:

| Variable | Default | Description |
|----------|---------|-------------|
| `HOST` | `0.0.0.0` | Server bind address |
| `PORT` | `8085` | Server port |
| `DATA_DIR` | `/app/data` (Docker) | Directory for database, encryption keys, and temp files |
| `DOWNLOAD_DIR` | `/downloads` (Docker) | Directory for proxied video downloads |
| `CREDENTIALS_ENCRYPTION_KEY` | auto-generated | Fernet key for credential encryption. Auto-generated on first run and saved to `DATA_DIR/.encryption_key` |
| `CORS_ORIGINS` | *(empty)* | Comma-separated list of allowed CORS origins |
| `CORS_ALLOW_ALL` | `false` | Allow all origins (development only) |
| `CORS_ALLOW_CREDENTIALS` | `true` | Allow credentials when specific origins are set |
| `DEBUG` | `false` | Enable auto-reload for development |
| `SECURE_COOKIES` | `true` | Require HTTPS for session cookies. Set to `false` only for local development without TLS |
| `YTDLP_SKIP_TLS_VERIFY` | `false` | Skip TLS certificate verification in yt-dlp requests |

:::tip Cleaner Configuration
Instead of listing environment variables inline in `docker-compose.yml`, create a `.env` file in the same directory and reference it:

```yaml
services:
  yattee-server:
    image: yattee/yattee-server:latest
    env_file: .env
    # ...
```

This keeps sensitive values out of your Compose file and makes it easier to manage configuration across environments.
:::

## Auto-Provisioning

You can skip the interactive setup wizard entirely by providing admin credentials and an optional Invidious URL as environment variables:

```yaml
services:
  yattee-server:
    image: yattee/yattee-server:latest
    container_name: yattee-server
    ports:
      - "8085:8085"
    volumes:
      - downloads:/downloads
      - data:/app/data
    environment:
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=your-secure-password
      - INVIDIOUS_INSTANCE_URL=https://invidious.example.com
    restart: unless-stopped

volumes:
  downloads:
  data:
```

When these variables are set, the server will automatically create the admin account and configure the Invidious proxy on first start. The `INVIDIOUS_INSTANCE_URL` variable is optional -- if omitted, the server will operate in yt-dlp-only mode.

:::note
Auto-provisioning only runs when no admin account exists yet. If the setup wizard has already been completed, these environment variables are ignored.
:::

## Building from Source

To build the Docker image locally from the source repository:

```bash
git clone https://github.com/yattee/yattee-server.git
cd yattee-server
docker compose up --build -d
```

This is useful for development or if you want to run the latest unreleased changes.

## Updating

To update to the latest published image:

```bash
docker compose pull
docker compose up -d
```

The server will apply any necessary database migrations automatically on startup.

## Next Steps

- [Setup Wizard](./setup-wizard.md) -- Create your admin account and configure initial settings
- [Reverse Proxy](./reverse-proxy.md) -- Put Yattee Server behind nginx or Caddy for HTTPS access
