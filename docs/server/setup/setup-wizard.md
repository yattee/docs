---
sidebar_position: 3
title: "Setup Wizard"
---

import ScreenshotPlaceholder from '@site/src/components/ScreenshotPlaceholder';

# Setup Wizard

When you start Yattee Server for the first time, the server automatically redirects all requests to the setup wizard at `/setup`. This wizard walks you through creating the initial admin account and optionally connecting an Invidious instance.

<ScreenshotPlaceholder description="Setup wizard page showing admin account creation form with username, password, confirm password, and Invidious Proxy URL fields" />

## What the Wizard Configures

The setup wizard handles two things:

1. **Admin account creation** -- The first user account with full administrative privileges.
2. **Invidious proxy configuration** (optional) -- A connection to an Invidious instance for extended features.

## Form Fields

| Field | Requirements | Description |
|-------|-------------|-------------|
| **Username** | 3--50 characters | The admin account username used to log in |
| **Password** | Minimum 6 characters | The admin account password |
| **Confirm Password** | Must match password | Password confirmation to prevent typos |
| **Invidious Proxy URL** | Optional, valid URL | The base URL of an Invidious instance (e.g., `https://invidious.example.com`) |

## Invidious Proxy

The Invidious Proxy URL field determines which features are available on the server:

**With an Invidious instance configured:**
- Video search
- Trending videos
- Channel browsing
- Captions and subtitles
- Thumbnail proxying

**Without an Invidious instance (yt-dlp only):**
- Direct video stream extraction via yt-dlp
- Invidious-dependent features (search, trending, channels, captions, thumbnails) are disabled

:::info
You can always add or change the Invidious instance later from the admin panel. Leaving this field empty during setup does not permanently disable any features.
:::

## After Setup

Once you submit the form, the server:

1. Creates the admin user account
2. Configures the Invidious proxy (if a URL was provided)
3. Redirects you to the watch page

From there, you can access the **admin panel** at `/admin` to configure sites, manage credentials, and adjust server settings.

:::note
Once setup is complete (i.e., at least one admin account exists), the setup wizard is no longer accessible. Navigating to `/setup` will redirect you to the main application.
:::

## Returning Users

After the initial setup, returning users can log in at `/login` with the credentials created during setup or any additional accounts created through the admin panel.

## Alternative: Auto-Provisioning

If you prefer to skip the interactive wizard -- for example, in automated deployments or CI/CD pipelines -- you can provision the admin account using environment variables:

```yaml
environment:
  - ADMIN_USERNAME=admin
  - ADMIN_PASSWORD=your-secure-password
  - INVIDIOUS_INSTANCE_URL=https://invidious.example.com
```

The `INVIDIOUS_INSTANCE_URL` variable is optional. When these variables are set and no admin account exists yet, the server creates the account automatically on startup without showing the setup wizard.

See the [Docker Setup](./docker.md#auto-provisioning) page for the full configuration example.

## Next Steps

- [Docker Setup](./docker.md) -- Full environment variable reference and volume configuration
- [Reverse Proxy](./reverse-proxy.md) -- Serve Yattee over HTTPS with a custom domain
