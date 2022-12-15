import desktopComponents from './desktop';
import mobileComponents from './mobile';
import utilsMenus from './utils';
import rcUiMenus from './rcui'
import iconsMenus from './icons';

const enumText = {
  common: '通用',
  layout: '布局',
  navigation: '导航',
  dataDisplay: '信息展示',
  dataEntry: '信息录入',
  feedback: '反馈',
  guidance: '引导提示',
  other: '其他',
  experimental: '试验性',
} as const

export type MenusKeys = keyof typeof enumText;
export type ComponentMenus = {
  [key in MenusKeys]?: Array<string>
}

function generateComponentMenus(menus: ComponentMenus, prefix: string) {
  let _menus: any[] = [];
  Object.entries(menus).forEach(([key, value]) => {
    if (value.length) {
      _menus.push({ title: enumText[key as MenusKeys], children: value, })
    }
  })
  return addPrefix(_menus, prefix);
}

function addPrefix(menus: any[], prefix: string) {
  return menus.map(item => {
    if (item.children) {
      item.children = item.children.map((child: string) => `${prefix}/${child}`);
    }
    return item;
  })
}

export const desktopPrefix = 'desktop-ui';
export const mobilePrefix = 'mobile-ui';
export const utilsPrefix = "utils";
export const rcUiPrefix = 'rc-ui';
export const iconsPrefix= 'icons'

export const menus = {
  [`/${desktopPrefix}`]: generateComponentMenus(desktopComponents, desktopPrefix),
  [`/${mobilePrefix}`]: generateComponentMenus(mobileComponents, mobilePrefix),
  [`/${utilsPrefix}`]: addPrefix(utilsMenus, utilsPrefix),
  [`/${rcUiPrefix}`]: addPrefix(rcUiMenus, rcUiPrefix),
  [`/${iconsPrefix}`]: addPrefix(iconsMenus, iconsPrefix),
}
