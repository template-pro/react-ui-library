import React from 'react'
import classNames from 'classnames'
import Drawer from 'antd/es/drawer'
import type { DrawerProps } from 'antd/es/drawer'
import type { UseModalEnhancedProps } from '@template-pro/utils'
import { useModalEnhanced } from '@template-pro/utils'
import { defaultPrefixCls } from '../constants'

export type BaseDrawerProps = DrawerProps & UseModalEnhancedProps

const BaseDrawer = (props: BaseDrawerProps) => {
  const {
    onClose,
    className,
    footer = null,
    ...restProps
  } = props

  const [
    visible,
    { close },
    { trigger, content },
  ] = useModalEnhanced(props)

  const handleDrawerClose = (event: React.MouseEvent<HTMLElement>) => {
    if (onClose)
      onClose(event)

    return close()
  }

  return (
    <>
      {trigger}
      <Drawer
        open={visible}
        onClose={handleDrawerClose}
        className={classNames(`${defaultPrefixCls}-base-drawer`, className)}
        footer={footer}
        destroyOnClose
        {...restProps}
      >
        {content}
      </Drawer>
    </>
  )
}

export default BaseDrawer
