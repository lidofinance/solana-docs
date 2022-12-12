/** @type {import('@docusaurus/types').DocusaurusConfig} */
const math = require('remark-math');
const katex = require('rehype-katex');
module.exports = {
  title: 'Lido on Solana',
  tagline: 'Awesome liquid staking on Solana, the high-performance, permissionless blockchain',
  url: 'https://docs.solana.lido.fi/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/stSOL.svg',
  organizationName: 'chorusone',
  projectName: 'solido',
  i18n: {
    defaultLocale: 'en',
    locales: [ 'en'],
  },
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
    navbar: {
      title: 'Lido on Solana',
      logo: {
        alt: 'Lido on Solana Logo',
        src: 'img/stSOL.svg',
        srcDark: 'img/stSOL.svg',
      },
      items: [
        {
          href: 'https://blog.lido.fi/category/stsol',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://github.com/lidofinance/solido',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/frontend-integration/manual-instructions/v1/stake',
            from: '/development/frontend-integration',
          },
        ],
      },
    ],
  ],
};
