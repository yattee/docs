---
sidebar_position: 1
title: "What is Yattee Server"
---

# What is Yattee Server

Yattee Server is a self-hosted API server powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp). It manages data extraction from YouTube and 1000+ other video sites, and is designed to back the [Yattee](https://github.com/yattee/yattee) app on iOS, macOS, and tvOS.

Running your own server gives you control over extraction, caching, and credentials, and removes reliance on third-party public instances.

## Key Features

### Extraction
- **yt-dlp powered** -- YouTube plus any site supported by yt-dlp (Twitch, Vimeo, BiliBili, and many more)
- **Per-site credentials** -- cookies and API keys configured per site
- **Stream proxy** -- fast parallel downloading with streaming delivery

### Search and Browsing
- **YouTube search** with filters for sort, date, duration, and type
- **Full channel browsing** -- videos, playlists, shorts, streams, and channel search
- **Comments, captions, thumbnails, and avatars**

### Feeds
- **Background feed fetcher** for channel subscriptions with automatic refresh
- **Watched channels view** in the admin panel with manual refresh trigger

### Invidious Compatibility
- **Invidious-compatible API** -- drop-in replacement for [Invidious](https://github.com/iv-org/invidious) endpoints
- **Optional backing Invidious instance** for trending and popular feeds

### Admin Panel
- **Setup wizard** -- first-run account creation and optional Invidious connection
- **Settings** -- cache TTLs, yt-dlp config, Invidious proxy, feed fetcher, rate limiting
- **Sites, users, and watched channels** management
- **In-browser watch page** -- play any video URL directly from the admin UI

### Security
- **HTTP Basic Auth** across the API and admin panel
- **HMAC-signed stream URLs** -- pass stream URLs to players without exposing credentials
- **Rate limiting** on failed authentication attempts
- **SSRF protection** on all user-supplied URLs
- **Credential encryption at rest** using Fernet (AES-128-CBC + HMAC-SHA256)

For the full security model, see [Security & Privacy](./security.md).

### Caching
- **Configurable TTL caching** for videos, search results, channels, avatars, and extractions

### Deployment
- **Docker Compose ready** with auto-provisioning for automated deployments
- **amd64 and arm64** images available on Docker Hub

## Requirements

| Component | Version |
|-----------|---------|
| Python    | 3.12+   |
| yt-dlp    | latest  |
| deno      | required by yt-dlp for YouTube JS challenge solving |
| ffmpeg    | required for media processing |

:::tip
The official Docker image bundles all required dependencies. For most deployments, [Docker](./setup/docker.md) is the recommended installation method.
:::

## Next Steps

- [Docker setup](./setup/docker.md) -- recommended installation path
- [Setup Wizard](./setup/setup-wizard.md) -- first-run configuration
- [Reverse Proxy](./setup/reverse-proxy.md) -- expose the server with TLS
