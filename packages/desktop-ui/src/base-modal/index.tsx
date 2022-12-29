import Modal, { type ModalProps } from 'antd/es/modal'
import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import { defaultPrefixCls } from '../constants'
import { isDOMTypeElement, isElement } from '../_utils/is'

export interface BaseModalAction {
  close: () => void
  open: () => void
}

export interface BaseModalProps {
  children?: React.ReactNode
  modalContent?: React.ReactNode
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    modalAction: BaseModalAction
  ) => void
  modalProps?: ModalProps
}

const BaseModal: React.ForwardRefRenderFunction<unknown, BaseModalProps> = (props, ref) => {
  const [modalVisible, { setTrue: open, setFalse: close }] = useBoolean(false)

  const modalActionRef = useRef<BaseModalAction>({ open, close })

  const { children, modalContent, onClick, modalProps = {} } = props

  const {
    onOk,
    onCancel,
    className,
    footer = null,
    ...restModalProps
  } = modalProps

  useImperativeHandle(ref, () => modalActionRef.current, [modalActionRef])

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick)
      return onClick(event, modalActionRef.current)

    return open()
  }

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

  // ======================== buttonNode ========================
  let buttonNode: React.ReactNode = children
  if (React.isValidElement(children))
    buttonNode = React.cloneElement<any>(children, { onClick: handleButtonClick })

  // ======================== modalContent ========================
  let childrenNode: React.ReactNode = modalContent
  if (isElement(childrenNode) && !isDOMTypeElement(childrenNode)) {
    childrenNode = React.cloneElement<any>(childrenNode, {
      modalAction: modalActionRef.current,
    })
  }

  return (
    <>
      {buttonNode}
      <Modal
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
        className={classNames(`${defaultPrefixCls}-base-modal`, className)}
        footer={footer}
        destroyOnClose
        {...restModalProps}
      >
        {childrenNode}
      </Modal>
    </>
  )
}

export default React.forwardRef(BaseModal)
