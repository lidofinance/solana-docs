/** @type {import('@docusaurus/types').DocusaurusConfig} */
const math = require('remark-math');
const katex = require('rehype-katex');
module.exports = {
  title: 'Lido for Solana',
  tagline: 'Awesome liquid staking on Solana, the high-performance, permissionless blockchain',
  url: 'https://chorusone.github.io',
  baseUrl: '/solido/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
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
      title: 'Lido for Solana',
      logo: {
        alt: 'Lido for Solana Logo',
        src: 'img/stSOL.svg',
        srcDark: 'img/stSOL.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://medium.com/chorus-one/introducing-lido-for-solana-8aa02db8503',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://github.com/chorusone/solido',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/overview'
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/chorusone',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/chorus-one',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://medium.com/chorus-one/introducing-lido-for-solana-8aa02db8503',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/chorusone/solido',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ChorusOne.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
