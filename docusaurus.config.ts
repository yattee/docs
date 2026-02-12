import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Yattee Documentation',
  tagline: 'Privacy-focused video streaming for iOS, macOS, and tvOS',
  favicon: 'favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.yattee.stream',
  baseUrl: '/',

  organizationName: 'yattee',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/yattee/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Yattee',
      logo: {
        alt: 'Yattee Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview/what-is-yattee',
          position: 'left',
          label: 'Overview',
        },
        {
          type: 'docSidebar',
          sidebarId: 'appSidebar',
          position: 'left',
          label: 'Yattee App',
        },
        {
          type: 'docSidebar',
          sidebarId: 'serverSidebar',
          position: 'left',
          label: 'Yattee Server',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          to: '/docs/changelog',
          label: 'Changelog',
          position: 'left',
        },
        {
          href: 'https://github.com/yattee',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Overview', to: '/docs/overview/what-is-yattee'},
            {label: 'Yattee App', to: '/docs/app/getting-started'},
            {label: 'Yattee Server', to: '/docs/server/setup/docker'},
            {label: 'Guides', to: '/docs/guides/complete-setup'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/yattee'},
            {label: 'Discord', href: 'https://yattee.stream/discord'},
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} Yattee. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'nginx'],
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
