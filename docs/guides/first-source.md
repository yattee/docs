---
sidebar_position: 2
title: "Adding Your First Source"
---

# Adding Your First Source

After installing Yattee, the first thing you'll want to do is add a source so you can start watching content. This guide covers the quickest ways to get started.

## Option A: Add a [Yattee Server](https://github.com/yattee/yattee-server)

If you have a self-hosted Yattee Server running (see the [Complete Setup](./complete-setup.md) guide):

1. Go to **Settings > Sources**.
2. Tap **+ Add Source** and select **Add Remote Server**.
3. Enter your server URL (e.g., `http://192.168.1.100:8085` or `https://yattee.example.com`).
4. Tap **Detect**. Yattee will verify the connection.
5. Enter the username and password you created in the setup wizard. Optionally, enter a name for the source.
6. Tap **Add Source**.

Yattee Server gives you access to YouTube and 1000+ other sites through yt-dlp.

## Option B: Add an [Invidious](https://invidious.io/) / [Piped](https://piped.video/) Instance

Another way to watch YouTube content.

1. Open Yattee and go to **Settings > Sources**.
2. Tap **+ Add Source** and select **Add Remote Server**.
3. Enter the URL of an Invidious or Piped instance.
4. Tap **Detect**. Yattee will verify the connection.
5. Enter a name for the source.
6. Tap **Add Source**.

You can now browse trending videos, search for content, and subscribe to channels.

## Option C: Add a Local Folder

To browse videos stored on your device:

1. Go to **Settings > Sources**.
2. Tap **+ Add Source** and select **Add Local Folder**.
3. Select a folder from the file picker.
4. Tap **Save**.

Your videos appear in the **Sources** tab. See [Local Folders](../app/sources/local-folders.md) for details.

## Option D: Add a Network Share

To access videos on a NAS or media server:

1. Go to **Settings > Sources**.
2. Tap **+ Add Source** and select **Add Samba Share** or **Add WebDAV Share**.
3. Enter the server address and credentials.
4. Tap **Save**.

Yattee can also discover shares on your local network automatically. See [Network Shares](../app/sources/network-shares.md) for details.

## Option E: Add a PeerTube Instance

To browse decentralized, community-hosted video content:

1. Go to **Settings > Sources**.
2. Tap **+ Add Source** and select **Browse PeerTube Instances**.
3. Browse the directory and tap an instance to add it.

You can also add a PeerTube instance manually by URL:

1. Tap **+ Add Source** and select **Add Remote Server**.
2. Enter the URL of a PeerTube instance.
3. Tap **Detect**. Yattee will verify the connection.
4. Enter a name for the source.
5. Tap **Add Source**.

See [Remote Servers](../app/sources/remote-servers.md#peertube) for details.

## Next Steps

- [Import your existing subscriptions](./import-subscriptions.md) from YouTube or other services
- [Learn more about sources](../app/sources/understanding-sources.md) and how to manage them
