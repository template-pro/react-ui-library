import React from 'react'
import classNames from 'classnames'

import type { CustomIconComponentProps, IconProps } from './typings'
import { svgBaseProps, useInsertStyles } from './utils'

const Icon = (props: IconProps) => {
  const {
    className,
    component: Component,
    viewBox,
    spin,
    rotate,
    tabIndex,
    onClick,
    children,
    prefixCls = 'template-pro',
    ...restProps
  } = props

  useInsertStyles()

  const classString = classNames(`${prefixCls}-icon`, className)

  const svgClassString = classNames({
    [`${prefixCls}-icon-spin`]: !!spin,
  })

  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined

  const innerSvgProps: CustomIconComponentProps = {
    ...svgBaseProps,
    className: svgClassString,
    style: svgStyle,
    viewBox,
  }

  if (!viewBox)
    delete innerSvgProps.viewBox

  const renderInnerNode = (function () {
    if (Component)
      return <Component {...innerSvgProps}>{children}</Component>

    if (children) {
      return (
        <svg {...innerSvgProps} viewBox={viewBox}>
          {children}
        </svg>
      )
    }
    return null
  }())

  let iconTabIndex = tabIndex
  if (iconTabIndex === undefined && onClick)
    iconTabIndex = -1

  return (
    <span
      role="img"
      {...restProps}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
    >
      {renderInnerNode}
    </span>
  )
}

Icon.displayName = 'TemplateProIcon'

export default Icon
