import { useEffect } from 'react'
import { insertCss } from 'insert-css'

export const svgBaseProps = {
  // width: '1em',
  // height: '1em',
  'fill': 'currentColor',
  'aria-hidden': 'true',
  'focusable': 'false',
}

export const iconStyles = `
.template-pro-icon {
  display: inline-block;
  width: 24px;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.template-pro-icon > * {
  line-height: 1;
}

.template-pro-icon svg {
  display: inline-block;
}

.template-pro-icon::before {
  display: none;
}

.template-pro-icon .template-pro-icon {
  display: block;
}

.template-pro-icon[tabindex] {
  cursor: pointer;
}

.template-pro-icon-spin::before,
.template-pro-icon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`

let cssInjectedFlag = false

export const useInsertStyles = (styleStr = iconStyles) => {
  useEffect(() => {
    if (!cssInjectedFlag) {
      insertCss(styleStr, {
        prepend: true,
      })
      cssInjectedFlag = true
    }
  }, [])
}
