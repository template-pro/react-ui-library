import useBoolean from 'ahooks/es/useBoolean'
import React from 'react'
import { isDOMTypeElement, isElement } from '../is'

export interface UseModalEnhancedContext {
  enhancedAction: UseModalEnhancedAction
}

export interface UseModalEnhancedProps {
  children?: React.ReactNode
  content?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>, enhancedAction: UseModalEnhancedAction) => void
  actionRef?: React.RefObject<UseModalEnhancedAction>
}

export interface UseModalEnhancedAction {
  close: () => void
  open: () => void
}

function useModalEnhanced(props: UseModalEnhancedProps = {}) {
  const {
    children,
    content,
    onClick,
    actionRef: actionRefProp,
  } = props

  const [visible, { setTrue: open, setFalse: close }] = useBoolean(false)

  const actionRef = React.useRef<UseModalEnhancedAction>({ open, close })

  React.useImperativeHandle(actionRefProp, () => actionRef.current)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick)
      return onClick(event, actionRef.current)

    return open()
  }

  // ======================== Trigger ========================
  let trigger: React.ReactNode = children
  if (React.isValidElement(children))
    trigger = React.cloneElement<any>(children, { onClick: handleClick })

  // ======================== Content ========================
  let contentNode: React.ReactNode = content
  if (isElement<UseModalEnhancedContext>(contentNode) && !isDOMTypeElement(contentNode)) {
    contentNode = React.cloneElement<UseModalEnhancedContext>(contentNode, {
      enhancedAction: actionRef.current,
    })
  }

  const contextHolder = { trigger, content: contentNode }
  const action = { open, close }

  return [visible, action, contextHolder] as const
}

export default useModalEnhanced
