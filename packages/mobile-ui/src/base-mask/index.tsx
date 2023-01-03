import React from 'react'
import classNames from 'classnames'
import type { MaskProps } from 'antd-mobile/es/components/mask'
import Mask from 'antd-mobile/es/components/mask'
import type { UseModalEnhancedProps } from '@template-pro/utils'
import { useModalEnhanced } from '@template-pro/utils'
import { defaultPrefixCls } from '../constants'

export type BaseMaskProps = MaskProps & Omit<UseModalEnhancedProps, 'content'> & {
  trigger?: React.ReactNode
}

const BaseMask = (props: BaseMaskProps) => {
  const {
    className,
    children,
    trigger: propsTrigger,
    afterClose,
    ...restProps
  } = props

  const [
    visible,
    { close },
    { trigger, content },
  ] = useModalEnhanced({
    children: propsTrigger,
    content: children,
    ...restProps,
  })

  const handleMaskClose = () => {
    afterClose?.()
    close()
  }

  return (
    <>
      {trigger}
      <Mask
        visible={visible}
        afterClose={handleMaskClose}
        className={classNames(`${defaultPrefixCls}-base-mask`, className)}
        destroyOnClose
        {...restProps}
      >
        {content}
      </Mask>
    </>
  )
}

export default BaseMask
