import path from 'path'
import type { IConfig } from 'dumi'
import { menus } from './menus'
import { navs } from './navs'

const resolvePath = (dir: string) => path.resolve(process.cwd(), dir)

const config: IConfig = {
  base: '/',
  publicPath: '/',
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  forkTSChecker: {},
  alias: {
    '@template-pro/desktop-ui': path.join(__dirname, 'library/desktop-ui'),
    '@template-pro/mobile-ui': path.join(__dirname, 'library/mobile-ui'),
    '@template-pro/icons': resolvePath('packages/icons/src'),
    '@template-pro/rc-ui': resolvePath('packages/rc-ui/src'),
    '@template-pro/utils': resolvePath('packages/utils/src'),
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es/components',
        style: false,
        customStyleName: (name: string) => {
          return `antd-mobile/es/components/${name}/${name}.css`
        },
      },
      'antd-mobile',
    ],
  ],
  chainWebpack(memo) {
    memo.module.rules.delete('svg')
    memo.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg')
      .loader('@svgr/webpack')
  },
  mode: 'site',
  title: 'react-ui-library',
  favicon: '/favicon.ico',
  logo: '/logo.svg',
  dynamicImport: {},
  manifest: {},
  hash: true,
  links: [
    { rel: 'stylesheet', href: 'https://unpkg.com/reset-css/reset.css' },
  ],
  resolve: {
    includes: ['docs', 'packages'],
    // passivePreview: true,
  },
  navs,
  menus,
  lessLoader: {
    modifyVars: {
      '@root-entry-name': 'default',
    },
    javascriptEnabled: true,
  },
}

export default config
