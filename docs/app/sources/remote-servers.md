---
sidebar_position: 4
title: "Remote Servers"
---

import ScreenshotPlaceholder from '@site/src/components/ScreenshotPlaceholder';

# Remote Servers

Remote servers let you stream video content from YouTube and other platforms through privacy-respecting backends. Instead of connecting to YouTube directly, Yattee routes requests through an intermediary server that fetches the content on your behalf -- keeping your IP address and viewing habits private.

:::note
Depending on the backend and its configuration, the actual video stream may still be served directly from the content provider's CDN rather than proxied through the server.
:::

Yattee supports four remote server backends, each with different strengths and trade-offs.

## Yattee Server

[Yattee Server](https://github.com/yattee/yattee-server) is a self-hosted video API server powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp). It provides the broadest site support of any backend, covering YouTube and over 1000 additional sites.

### Key Features

- YouTube support plus 1000+ other sites (Vimeo, TikTok, Twitch, Dailymotion, and many more)
- Full search with advanced filters
- Search suggestions as you type
- Popular/trending videos
- Direct CDN URLs that bypass rate limits common with proxy-based backends
- Powered by yt-dlp, which is actively maintained and frequently updated

### Adding a Yattee Server

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Remote Server**
4. Enter your Yattee Server URL
5. Enter your credentials (HTTP Basic Auth -- **required**)
6. Tap **Save**

Yattee Server requires self-hosting. See the [Server Documentation](../../server/setup/docker.md) for setup instructions.

### Authentication

Unlike Invidious and Piped where login is optional, Yattee Server **requires authentication** via HTTP Basic Auth. You must provide a username and password when adding the source.

## Invidious

[Invidious](https://invidious.io/) is an open-source alternative frontend for YouTube. It provides access to YouTube's full video catalog, search, and subscription features without requiring a Google account.

### Key Features

- Full YouTube search with advanced filters (date, duration, type, sort order)
- Subscriptions and personalized feed
- Search suggestions as you type
- Popular/trending videos
- Optional account login for syncing subscriptions across devices

### Adding an Invidious Instance

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Remote Server**
4. Enter the URL of an Invidious instance (e.g., `https://invidious.example.com`)
5. Optionally log in with your Invidious account credentials
6. Tap **Save**

## Piped

[Piped](https://piped.video/) is an alternative YouTube frontend with a different architecture from Invidious. It uses a proxy-based approach and offers its own set of instances.

### Key Features

- Subscriptions and personalized feed
- Search suggestions as you type
- Optional account login for syncing subscriptions

### Adding a Piped Instance

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Remote Server**
4. Enter the URL of a Piped instance (e.g., `https://piped.example.com`)
5. Optionally log in with your Piped account credentials
6. Tap **Save**

## PeerTube

[PeerTube](https://joinpeertube.org/) is a federated, decentralized video platform. Unlike Invidious and Piped, PeerTube is not a YouTube frontend -- it hosts its own content across a network of independent, interconnected instances.

### Key Features

- Browse and search videos on any PeerTube instance
- Federated content across the PeerTube network
- No account or authentication required

### Adding a PeerTube Instance

There are two ways to add a PeerTube instance:

**Browse the Instance Directory:**

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Browse PeerTube Instances**
4. Browse the directory of PeerTube instances from within the app
5. Tap an instance to add it as a source

**Enter a URL Manually:**

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Remote Server**
4. Enter the URL of a PeerTube instance
5. Tap **Save**

### Federated Content

Because PeerTube is decentralized, video IDs are specific to each instance. A video hosted on one PeerTube instance has a different identifier than the same video federated to another instance. This is different from YouTube-based backends where every video has a single global ID.

<ScreenshotPlaceholder description="Instance Browse view showing available backends" platform="iOS" />

## Feature Comparison

| Feature | Yattee Server | Invidious | Piped | PeerTube |
|---|---|---|---|---|
| Search filters | Yes | Yes | No | No |
| Subscriptions/Feed | Yes | Yes | Yes | No |
| Search suggestions | No* | Yes | Yes | No |
| Popular videos | No* | Yes | No | No |
| Trending videos | No* | Yes | No | No |
| Authentication | Required | Optional | Optional | No |
| Non-YouTube sites | Yes (1000+) | No | No | Yes (federated) |

*Available when an Invidious instance is configured as a backing service.

## Choosing a Backend

- **Want YouTube + other sites?** -- Set up a **Yattee Server**. It requires self-hosting but gives you access to the broadest range of sites with direct CDN streaming.
- **Just want YouTube quickly?** -- Use an **Invidious** or **Piped** instance. Just enter an instance URL and start watching.
- **Interested in decentralized video?** -- Add a **PeerTube** instance to discover independently hosted content outside the YouTube ecosystem.
- **Want the best of all worlds?** -- Add multiple backends. Yattee lets you configure as many sources as you like, and you can switch between them freely.
