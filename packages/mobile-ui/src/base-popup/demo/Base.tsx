import React, { useRef } from 'react'
import { Button } from 'antd-mobile'
import type { UseModalEnhancedAction, UseModalEnhancedContext } from '@template-pro/mobile-ui'
import { BasePopup } from '@template-pro/mobile-ui'

const Content = ({ enhancedAction }: Partial<UseModalEnhancedContext>) => (
  <div style={{ padding: 24 }}>
    <h3>这是弹出层内容</h3>
    <Button onClick={enhancedAction?.close}>
      点击关闭弹出层
    </Button>
  </div>
)

function App() {
  const drawerRef = useRef<UseModalEnhancedAction>(null)

  return (
    <BasePopup
      content={<Content />}
      bodyStyle={{ height: '40vh' }}
      actionRef={drawerRef}
    >
      <Button>打开弹出层</Button>
    </BasePopup>
  )
}

export default App
