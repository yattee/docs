import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  appSidebar: [
    {
      type: 'doc',
      id: 'app/getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Sources',
      collapsed: false,
      items: [
        'app/sources/understanding-sources',
        'app/sources/local-folders',
        'app/sources/network-shares',
        'app/sources/remote-servers',
      ],
    },
  ],

  serverSidebar: [
    {
      type: 'category',
      label: 'Setup',
      collapsed: false,
      items: [
        'server/setup/docker',
        'server/setup/reverse-proxy',
        'server/setup/setup-wizard',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      collapsed: false,
      items: [
        'server/admin/settings',
        'server/admin/users',
        'server/admin/sites',
        'server/admin/credentials',
      ],
    },
    {
      type: 'doc',
      id: 'server/security',
      label: 'Security & Privacy',
    },
    {
      type: 'doc',
      id: 'server/troubleshooting',
      label: 'Troubleshooting',
    },
  ],

  guidesSidebar: [
    {
      type: 'doc',
      id: 'guides/complete-setup',
      label: 'Complete Setup from Scratch',
    },
    {
      type: 'doc',
      id: 'guides/first-source',
      label: 'Adding Your First Source',
    },
    {
      type: 'doc',
      id: 'guides/import-subscriptions',
      label: 'Importing from YouTube',
    },
    {
      type: 'doc',
      id: 'guides/import-from-instance',
      label: 'Importing from Invidious/Piped',
    },
    {
      type: 'doc',
      id: 'guides/public-instances',
      label: 'Public Instances for YouTube',
    },
  ],
};

export default sidebars;
