import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FrankMax Marketplace',
  tagline: 'The AppSumo of Institutional AI — 713 Offerings, 15 Audiences, 8 Entities',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://marketplace.frankmax.io',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'FrankMax Marketplace',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/executive-overview',
          label: 'Overview',
          position: 'left',
        },
        {
          to: '/audiences',
          label: 'Audiences',
          position: 'left',
        },
        {
          to: '/economic-model',
          label: 'Economics',
          position: 'left',
        },
        {
          to: '/_recovery',
          label: 'Agent Recovery',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Core',
          items: [
            {label: 'Agent Recovery Prompt', to: '/_recovery'},
            {label: 'Executive Overview', to: '/executive-overview'},
            {label: 'Economic Model', to: '/economic-model'},
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {label: 'Ecosystem Entities', to: '/ecosystem-entities'},
            {label: 'Protocols', to: '/protocols'},
            {label: 'Platform', to: '/platform'},
          ],
        },
        {
          title: 'Operations',
          items: [
            {label: 'Frankmax Services', to: '/operations/frankmax-services'},
            {label: 'LevelUpMax', to: '/operations/levelupmax'},
            {label: 'Risk & Governance', to: '/risk-governance'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FrankMax Digital. All rights reserved.`,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
