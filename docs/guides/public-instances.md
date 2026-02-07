---
sidebar_position: 5
title: "Public Instances for YouTube"
---

# Public Instances for YouTube

Yattee supports connecting to Invidious and Piped instances as video sources. You might be wondering whether you can use a public instance instead of hosting your own server.

## The Problem with Public Instances

Both Invidious and Piped are excellent open-source projects that provide alternative frontends to YouTube. Many community members run public instances that anyone can use.

Unfortunately, Google actively works to block these public instances. Because public instances handle large volumes of traffic from many users, they are easy targets for detection and blocking. As a result:

- Most public instances experience frequent downtime or degraded performance
- Video playback may fail without warning
- Instances that work today may stop working tomorrow
- The situation has been getting progressively worse over time

Because of this, **it is close to impossible to find a public instance that works reliably with Yattee**. We do not endorse or provide any public instance list, as any such list would quickly become outdated.

## Our Recommendation: Self-Host

The most reliable way to access YouTube content through Yattee is to run your own **Yattee Server**. Self-hosting gives you:

- **Reliability** -- Your own server is far less likely to be blocked than a public instance serving thousands of users
- **Performance** -- No shared load means faster responses
- **Privacy** -- Your viewing activity stays on your own hardware
- **Control** -- You manage updates and configuration on your own terms

Yattee Server uses yt-dlp under the hood and can be set up in minutes using Docker.

:::tip Getting started
Follow the [Complete Setup from Scratch](./complete-setup.md) guide to deploy your own Yattee Server and connect it to the app.
:::

## Can I Still Use a Public Instance?

Yes. If you find a working Invidious or Piped instance, you can add it as a source in Yattee under **Settings > Sources**. Just be aware that it may stop working at any time due to blocks from Google.
