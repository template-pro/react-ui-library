import React, { useRef } from 'react'
import { Button } from 'antd'
import type { UseModalEnhancedAction, UseModalEnhancedContext } from '@template-pro/desktop-ui'
import { BaseModal } from '@template-pro/desktop-ui'

const Content = ({ enhancedAction }: Partial<UseModalEnhancedContext>) => (
  <>
    <h3>这是弹框内容</h3>
    <Button onClick={enhancedAction?.close}>
      点击关闭弹框
    </Button>
  </>
)

function App() {
  const modalRef = useRef<UseModalEnhancedAction>(null)

  return (
    <BaseModal
      actionRef={modalRef}
      title='标题'
      footer={
        <Button
          onClick={() => modalRef.current?.close()}>
          通过 Ref 关闭
        </Button>
      }
      content={<Content />}
    >
      <Button>打开弹窗</Button>
    </BaseModal>
  )
}

export default App
