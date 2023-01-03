import React from 'react'
import classNames from 'classnames'
import type { PopupProps } from 'antd-mobile/es/components/popup'
import Popup from 'antd-mobile/es/components/popup'
import type { UseModalEnhancedProps } from '@template-pro/utils'
import { useModalEnhanced } from '@template-pro/utils'
import { defaultPrefixCls } from '../constants'

export type BasePopupProps = PopupProps & Omit<UseModalEnhancedProps, 'onClick'> & {
  triggerClick?: UseModalEnhancedProps['onClick']
}

const BasePopup = (props: BasePopupProps) => {
  const {
    className,
    onClose,
    onClick,
    triggerClick,
    ...restProps
  } = props

  const [
    visible,
    { close },
    { trigger, content },
  ] = useModalEnhanced({ ...restProps, onClick: triggerClick })

  const handlePopupClose = () => {
    if (onClose)
      onClose()

    return close()
  }

  return (
    <>
      {trigger}
      <Popup
        visible={visible}
        onClose={handlePopupClose}
        className={classNames(`${defaultPrefixCls}-base-popup`, className)}
        destroyOnClose
        closeOnMaskClick
        onClick={onClick}
        {...restProps}
      >
        {content}
      </Popup>
    </>
  )
}

export default BasePopup
