# Yattee Documentation

Documentation site for [Yattee](https://github.com/yattee) — a privacy-focused video streaming app for iOS, macOS, and tvOS.

**Live site:** [docs.yattee.stream](https://docs.yattee.stream)

## Local Development

**Prerequisites:** Node.js 20+

```bash
# Install dependencies
npm ci

# Start dev server
npm start

# Production build
npm run build

# Serve production build locally
npm run serve
```

## Project Structure

```
docs/           # Documentation content (Markdown/MDX)
src/            # Custom React components and CSS
static/         # Static assets (images, favicon)
docusaurus.config.ts   # Site configuration
sidebars.ts            # Sidebar navigation
```

## Deployment

Automated via GitHub Actions — every push to `main` builds the site and deploys to GitHub Pages.

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for the workflow configuration.
