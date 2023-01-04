import React, { useRef } from 'react'
import { Button } from 'antd'
import type { UseModalEnhancedAction, UseModalEnhancedContent } from '@template-pro/desktop-ui'
import { BaseDrawer } from '@template-pro/desktop-ui'

const Content = ({ enhancedAction }: Partial<UseModalEnhancedContent>) => (
  <>
    <h3>这是抽屉内容</h3>
    <Button onClick={enhancedAction?.close}>
      点击关闭抽屉
    </Button>
  </>
)

function App() {
  const drawerRef = useRef<UseModalEnhancedAction>(null)

  return (
    <BaseDrawer
      title='标题'
      content={<Content />}
      actionRef={drawerRef}
      footer={
        <Button
          onClick={() => drawerRef.current?.close()}>
          通过 Ref 关闭
        </Button>
      }
    >
      <Button>打开抽屉</Button>
    </BaseDrawer>
  )
}

export default App
