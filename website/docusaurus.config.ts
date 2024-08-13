import path from 'path';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { PresetEntry } from 'redocusaurus';

const redocusaurus: PresetEntry = [
  'redocusaurus',
  {
    debug: Boolean(process.env.DEBUG || process.env.CI),
    config: path.join(__dirname, 'redocly.yaml'),
    specs: [
      {
        id: 'sonity-gateway',
        spec: 'openapi/sonity-gateway/openapi.yaml',
        route: '/examples/sonity-gateway/',
      },
      {
        id: 'selenium-api',
        spec: 'openapi/selenium-api/openapi.yaml',
        route: '/examples/selenium-api/',
      },
      {
        id: 'sonity-mq',
        spec: 'openapi/sonity-mq/openapi.yaml',
        route: '/examples/sonity-mq/',
      },
      {
        id: 'sonity-webhooks',
        spec: 'openapi/sonity-webhooks/openapi.yaml',
        route: '/examples/sonity-webhooks/',
      },
      {
        id: 'sonity-oracle',
        spec: 'openapi/sonity-oracle/openapi.yaml',
        route: '/examples/sonity-oracle/',
      },
      // {
      //   id: 'using-multi-file-yaml',
      //   spec: 'openapi/multi-file/openapi.yaml',
      //   route: '/examples/using-multi-file-yaml/',
      // },
      // {
      //   id: 'using-swagger-json',
      //   spec: 'openapi/swagger/swagger.json',
      //   route: '/examples/using-swagger-json/',
      // },
      // {
      //   id: 'using-remote-url',
      //   // Remote File
      //   spec: 'https://redocly.github.io/redoc/openapi.yaml',
      //   route: '/examples/using-remote-url/',
      // },
      // {
      //   id: 'using-custom-page',
      //   spec: 'openapi/single-file/openapi.yaml',
      //   // NOTE: no `route` passed, instead data used in custom React Component ('custom-page/index.jsx')
      // },
      // {
      //   id: 'using-custom-layout',
      //   spec: 'openapi/single-file/openapi.yaml',
      //   // NOTE: no `route` passed, instead data used in custom React Component ('custom-layout/index.jsx')
      // },
    ],
    theme: {
      /**
       * Highlight color for docs
       */
      primaryColor: '#1890ff',
    },
  },
];

if (process.env.VERCEL_URL) {
  process.env.DEPLOY_PRIME_URL = `https://${process.env.VERCEL_URL}`;
}

const config: Config = {
  title: 'Sonity Docs',
  tagline: 'Hi there! At Sonity we are building a state of the art LinkedIn automation tool. This documentation will help you to understand how Sonity works',
  customFields: {
    meta: {
      description: 'Integrate Redoc easily into your Docusaurus Site',
    },
  },
  url: process.env.DEPLOY_PRIME_URL || 'http://localhost:5000', // Your website URL
  baseUrl: '/dev-docs/', // Base URL for your project */
  organizationName: 'sonity-ops', // Usually your GitHub org/user name.
  projectName: 'dev-docs', // Usually your repo name.
  favicon: 'img/favicon.ico',
  plugins: [require.resolve('docusaurus-lunr-search')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        theme: { customCss: [require.resolve('./src/custom.css')] },
        docs: {
          routeBasePath: '/docs',
          editUrl:
            'https://github.com/rohit-gohri/redocusaurus/edit/main/website/',
        },
      } satisfies Preset.Options,
    ],
    // Redocusaurus Config
    //@ts-ignore
    redocusaurus,
  ],
  themeConfig: {
    navbar: {
      title: 'Sonity Docs',
      logo: {
        alt: 'Sonity Docs',
        src: 'img/logo.png',
      },
      items: [
        {
          label: 'Docs',
          position: 'left',
          to: '/docs',
        },
        {
          label: 'API',
          position: 'left',
          items: [
            {
              label: 'Sonity Gateway',
              to: '/examples/sonity-gateway/',
            },
            {
              label: 'Selenium API',
              to: '/examples/selenium-api/',
            },
            {
              label: 'Sonity MQ',
              to: '/examples/sonity-mq/',
            },
            {
              label: 'Sonity Webhooks',
              to: '/examples/sonity-webhooks/',
            },
            {
              label: 'Sonity Oracle',
              to: '/examples/sonity-oracle/',
            },
            // {
            //   label: 'Using Remote URL',
            //   to: '/examples/using-remote-url/',
            // },
            // {
            //   label: 'Using Multiple YAMLs',
            //   to: '/examples/using-multi-file-yaml/',
            // },
            // {
            //   label: 'Using Swagger',
            //   to: '/examples/using-swagger-json/',
            // },
            // {
            //   label: 'Custom Page',
            //   to: '/examples/custom-page/',
            // },
            // {
            //   label: 'Custom Layout',
            //   to: '/examples/custom-layout/',
            // },
            // {
            //   label: 'Client Only',
            //   to: '/examples/client-only/',
            // },
          ],
        },
        // {
        //   label: 'v1+',
        //   position: 'right',
        //   items: [
        //     {
        //       label: 'v0',
        //       href: 'https://redocusaurus-v0.vercel.app/',
        //     },
        //     {
        //       label: 'v1+',
        //       href: 'https://redocusaurus.vercel.app',
        //     },
        //   ],
        // },
        // {
        //   href: 'https://github.com/rohit-gohri/redocusaurus',
        //   position: 'right',
        //   className: 'header-github-logo',
        //   'aria-label': 'GitHub Repo',
        // },
      ],
    },
    footer: {
      // logo: {
      //   alt: 'Redocusaurus Logo',
      //   src: 'img/logoDark.png',
      // },
      style: 'dark',
      links: [
        {
          title: 'Site',
          items: [
            {
              label: 'Sonity',
              href: 'https://sonity.info',
            },
            
          ],
        },
        {
          title: 'Microservices',
          items: [
            {
              label: 'Portal Example',
              href: '/docs/category/portal-example',
            },
            {
              label: 'Sonity Gateway',
              href: '/docs/category/sonity-gateway',
            },
            {
              label: 'Selenium API',
              href: '/docs/category/selenium-api',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://sonity.info" target="_blank" rel="noopener noreferrer">Sonity</a>. Built with <a href="https://github.com/facebook/docusaurus" target="_blank" rel="noopener noreferrer">Docusaurus</a>`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
