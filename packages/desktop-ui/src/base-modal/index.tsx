import React from 'react'
import classNames from 'classnames'
import Modal from 'antd/es/modal'
import type { ModalProps } from 'antd/es/modal'
import type { UseModalEnhancedProps } from '@template-pro/utils'
import { useModalEnhanced } from '@template-pro/utils'
import { defaultPrefixCls } from '../constants'

export type BaseModalProps = ModalProps & UseModalEnhancedProps

const BaseModal = (props: BaseModalProps) => {
  const {
    onOk,
    onCancel,
    footer = null,
    className,
    ...restProps
  } = props

  const [
    visible,
    { close },
    { trigger, content },
  ] = useModalEnhanced(props)

  const handleModalOk = (event: React.MouseEvent<HTMLElement>) => {
    if (onOk)
      return onOk(event)

    return close()
  }

  const handleModalCancel = (event: React.MouseEvent<HTMLElement>) => {
    if (onCancel)
      onCancel(event)

    return close()
  }

  return (
    <>
      {trigger}
      <Modal
        open={visible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
        className={classNames(`${defaultPrefixCls}-base-modal`, className)}
        footer={footer}
        destroyOnClose
        {...restProps}
      >
        {content}
      </Modal>
    </>
  )
}

export default BaseModal
