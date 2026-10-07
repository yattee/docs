---
title: "Automation"
---

# Automation

Other apps, Shortcuts, Siri and home automation can control Yattee in three ways:

| | Use it to | Works on |
| --- | --- | --- |
| [URL Scheme](./url-scheme.md) | Open videos, channels and screens, queue, download, bookmark and control the player with `yattee://` links | iPhone, iPad, Mac, Apple TV |
| [x-callback-url](./x-callback-url.md) | Run the same actions and get the result back in the app that asked | iPhone, iPad, Mac |
| [Shortcuts and Siri](./shortcuts.md) | Build shortcuts from Yattee's actions, or ask Siri | iPhone, iPad, Mac |

## Which one to use

- **Building a shortcut?** Use the [Shortcuts actions](./shortcuts.md). They don't ask for confirmation and return values you can use in the next step.
- **Calling Yattee from another app, a script or a web page?** Open a [`yattee://` link](./url-scheme.md).
- **Need to know if it worked, or what's playing?** Wrap the link in [x-callback-url](./x-callback-url.md).
- **Controlling an Apple TV from home automation?** See [Home automation](./url-scheme.md#home-automation).
