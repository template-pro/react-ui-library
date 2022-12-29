import type { ComponentMenus } from '.'

const desktopComponent: ComponentMenus = {
  common: [],
  layout: [],
  navigation: [],
  dataDisplay: [
    'src/select-trigger',
    'src/search-result',
  ],
  dataEntry: [
    'src/ignore-emoji-input',
    'src/number-only-input',
  ],
  feedback: [
    'src/base-modal',
    'src/base-drawer',
  ],
  guidance: [],
  other: [],
}

export default desktopComponent
