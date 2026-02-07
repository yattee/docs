---
sidebar_position: 1
title: "Complete Setup from Scratch"
---

# Complete Setup from Scratch

This guide walks you through setting up the full Yattee ecosystem: a self-hosted Yattee Server and the Yattee app on your Apple device.

## What You'll Need

- A server or computer to host Yattee Server (any machine that runs Docker)
- An Apple device running iOS 18+, macOS 15+, or tvOS 18+
- About 15 minutes

## Step 1: Deploy Yattee Server

Follow the [Docker Setup](../server/setup/docker.md) guide to install and run Yattee Server on your machine.

## Step 2: Run the Setup Wizard

Open `http://your-server-ip:8085` in a browser. On first launch, you'll see the setup wizard.

1. **Create an admin account** -- Choose a username and a strong password.
2. **Configure Invidious** (optional) -- Enter the URL of an Invidious instance to enable YouTube search, trending, and channel browsing through the Invidious API.

After completing the wizard, you'll be redirected to the admin panel.

For more details, see the [Setup Wizard](../server/setup/setup-wizard.md) page.

## Step 3: Configure Sites and Credentials

In the admin panel at `/admin`:

1. **YouTube** is enabled by default. To access age-restricted or region-locked content, add cookies or login credentials on the [Sites](../server/admin/sites.md) page.
2. **Add additional sites** if you want to stream from other platforms (TikTok, Twitter, Vimeo, etc.). Use the popular sites dropdown for quick setup.

See [Credentials & Security](../server/admin/credentials.md) for details on adding authentication.

## Step 4: Install Yattee

Install the Yattee app on your device:

- **iOS / iPadOS** -- join the [TestFlight beta](https://yattee.stream/beta2)
<!-- - **macOS** -- Download from the Mac App Store -->
<!-- - **tvOS** -- Download from the tvOS App Store -->

## Step 5: Add Your Server as a Source

1. Open Yattee and go to **Settings > Sources**.
2. Tap **+ Add Source** and select **Add Remote Server**.
3. Enter your server URL (e.g., `http://192.168.1.100:8085` or `https://yattee.example.com` if you set up a [reverse proxy](../server/setup/reverse-proxy.md)).
4. Tap **Detect**. Yattee will verify the connection.
5. Enter the username and password you created in the setup wizard. Optionally, enter a name for the source.
6. Tap **Add Source**.

## Step 6: Start Watching

You're all set. Head to the **Sources** tab to browse popular and trending content, or use **Search** to find specific videos.

:::tip
For the best experience, set up a reverse proxy with HTTPS so you can access your server securely from anywhere. See the [Reverse Proxy](../server/setup/reverse-proxy.md) guide.
:::

## Optional: Add More Sources

Yattee supports multiple sources simultaneously. You can add:

- **Invidious** or **Piped** instances for additional YouTube access
- **PeerTube** instances for decentralized video content
- **Local folders** or **network shares** (SMB/WebDAV) for personal media

See [Understanding Sources](../app/sources/understanding-sources.md) for the full overview.

## Next Steps

- [Import your YouTube subscriptions](./import-subscriptions.md) from Google Takeout
- [Configure server settings](../server/admin/settings.md) for cache, feed, and performance tuning
- [Manage users](../server/admin/users.md) if others will share your server
