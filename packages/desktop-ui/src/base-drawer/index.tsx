import Drawer, { type DrawerProps } from 'antd/es/drawer'
import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import { defaultPrefixCls } from '../constants'
import { isDOMTypeElement, isElement } from '../_utils/is'

export interface BaseDrawerAction {
  close: () => void
  open: () => void
}

export interface BaseDrawerProps {
  children?: React.ReactNode
  drawerContent?: React.ReactNode
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    modalAction: BaseDrawerAction
  ) => void
  drawerProps?: DrawerProps
}

const BaseDrawer: React.ForwardRefRenderFunction<unknown, BaseDrawerProps> = (props, ref) => {
  const [drawerVisible, { setTrue: open, setFalse: close }] = useBoolean(false)

  const drawerActionRef = useRef<BaseDrawerAction>({ open, close })

  const { children, drawerContent, onClick, drawerProps = {} } = props

  const {
    onClose,
    className,
    footer = null,
    ...restDrawerProps
  } = drawerProps

  useImperativeHandle(ref, () => drawerActionRef.current, [drawerActionRef])

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick)
      return onClick(event, drawerActionRef.current)

    return open()
  }

  const handleDrawerClose = (event: React.MouseEvent<HTMLElement>) => {
    if (onClose)
      onClose(event)

    return close()
  }

  // ======================== buttonNode ========================
  let buttonNode: React.ReactNode = children
  if (React.isValidElement(children))
    buttonNode = React.cloneElement<any>(children, { onClick: handleButtonClick })

  // ======================== drawerContent ========================
  let childrenNode: React.ReactNode = drawerContent
  if (isElement(childrenNode) && !isDOMTypeElement(childrenNode)) {
    childrenNode = React.cloneElement<any>(childrenNode, {
      drawerAction: drawerActionRef.current,
    })
  }

  return (
    <>
      {buttonNode}
      <Drawer
        open={drawerVisible}
        onClose={handleDrawerClose}
        className={classNames(`${defaultPrefixCls}-base-drawer`, className)}
        footer={footer}
        destroyOnClose
        {...restDrawerProps}
      >
        {childrenNode}
      </Drawer>
    </>
  )
}

export default React.forwardRef(BaseDrawer)
