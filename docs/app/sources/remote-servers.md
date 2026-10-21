---
sidebar_position: 4
title: "Remote Servers"
---

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
- Optional sign-in to one or more [accounts](#accounts) for subscriptions, playlists and watch history

### Adding an Invidious Instance

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Remote Server**
4. Enter the URL of an Invidious instance (e.g., `https://invidious.example.com`)
5. Optionally sign in to your Invidious account (see [Accounts](#accounts))
6. Tap **Save**

## Piped

[Piped](https://piped.video/) is an alternative YouTube frontend with a different architecture from Invidious. It uses a proxy-based approach and offers its own set of instances.

### Key Features

- Subscriptions and personalized feed
- Search suggestions as you type
- Optional sign-in to one or more [accounts](#accounts) for subscriptions and playlists

### Adding a Piped Instance

1. Open **Settings > Sources**
2. Tap **+ Add Source**
3. Select **Add Remote Server**
4. Enter the URL of a Piped instance (e.g., `https://piped.example.com`)
5. Optionally sign in to your Piped account (see [Accounts](#accounts))
6. Tap **Save**

## Accounts

You can sign in to several Invidious or Piped accounts, including more than one on the same instance. Subscriptions, the feed, playlists and watch history follow the account you select.

### Signing In

1. Open **Settings > Sources** and tap the instance.
2. In the **Account** section, tap **Log in to Account** (or **Add Account** once one is signed in).
3. Enter your **Username** and **Password** and tap **Sign In**.

Each account row has a menu with **Use This Account**, **Sign In Again**, **Rename** and **Sign Out & Remove**. A new name is shown on all your devices. Removing an account deletes its saved login and removes it from your other devices too.

### Switching Accounts

Pick the account with the **Account** button:

- **iPhone** -- in the toolbar on Home, Playlists, History and Subscriptions
- **iPad** -- at the bottom of the sidebar (in the toolbar in compact width)
- **Mac** -- at the bottom of the sidebar
- **Apple TV** -- on Playlists, History and Subscriptions
- **Everywhere** -- **Settings > Accounts > Current Account**

Besides your signed-in accounts, the list includes **Yattee (This Device)**, or **Yattee (iCloud)** with iCloud sync on, for data stored in the app itself. To hide the switcher outside Settings, turn off **Show Account Pickers** at the bottom of **Settings > Accounts**.

### Managing Accounts

**Settings > Accounts** lists every account by source, with its status: **Signed in**, **Sign in required**, **Sign in again**, **Unreachable**, **Source switched off**, **Inactive** or **Source missing**. When a server rejects a login or an account's source is missing, an orange badge appears on **Accounts** in Settings and on the switcher.

Use **Deactivate** to hide an account from the switcher without signing out, and **Activate** to bring it back. Deactivating the selected account switches to Yattee storage.

Accounts sync to your other devices with the **Instances** category in **Settings > iCloud**. On Apple TV, use **Sign In on This Device** if an account synced without its login.

### Choosing Where Things Go

- **Subscriptions** -- in a channel's **Subscription Options** menu, **Subscribe On…** picks the account or Yattee storage to subscribe on.
- **Playlists** -- the **Add to Playlist** sheet has an **Account** picker for the destination.
- **Imports** -- **Import Subscriptions** asks for an **Account** when there is more than one destination. See [Importing from Invidious or Piped](../../guides/import-from-instance.md).

### Account Playlists

With an Invidious or Piped account selected, you can manage its playlists on the server:

- **New Playlist** creates one
- **Edit Playlist** changes the **Playlist Name** and **Description**, and on Invidious the **Visibility** (Public, Unlisted or Private)
- **Delete Playlist** removes it from your account
- Videos can be added and removed like in local playlists

### Invidious Watch History

When an Invidious account is selected, videos you play are saved to that account's history on the server, and the **History** screen shows that history. You can remove videos from it there. **Save Watch History** in **Settings > Privacy** controls both local and server history, and Incognito stops both.

### Sharing via the Instance

Turn on **Use Privacy Frontend URLs When Sharing** in **Settings > Navigation** to share links to your instance's web page instead of YouTube. Piped often serves its web frontend from a different address than its API; set it in the **Frontend URL** field when editing the Piped source.

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
