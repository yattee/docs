// GitHub Pages serves the same page at both `/docs/foo` and `/docs/foo.html`
// (and `/` and `/index.html`), but the Docusaurus route table only contains the
// extensionless variant. Visiting the `.html` URL makes hydration fail and the
// app render a second copy of the page below the pre-rendered one. This runs
// before hydration and rewrites the URL so it matches a route.
if (typeof window !== 'undefined') {
  const {pathname, search, hash} = window.location;
  if (pathname.endsWith('.html')) {
    let normalized = pathname.endsWith('/index.html')
      ? pathname.slice(0, -'index.html'.length)
      : pathname.slice(0, -'.html'.length);
    // trailingSlash: false — routes have no trailing slash except the root.
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    window.history.replaceState(window.history.state, '', normalized + search + hash);
  }
}

export {};
