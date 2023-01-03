import React, { useRef } from 'react'
import type { UseModalEnhancedAction, UseModalEnhancedContext } from '@template-pro/mobile-ui'
import { BasePopup } from '@template-pro/mobile-ui'
import { Button } from 'antd-mobile'

const Content = ({ enhancedAction }: Partial<UseModalEnhancedContext>) => (
  <div style={{ padding: 24 }}>
    <h3>这是弹出层内容</h3>
    <Button onClick={enhancedAction?.close}>
      点击关闭弹出层
    </Button>
  </div>
)

function App() {
  const popupRef = useRef<UseModalEnhancedAction>(null)

  return (
    <>
      <BasePopup
        content={<Content />}
        bodyStyle={{ height: '40vh' }}
        actionRef={popupRef}
      >
        <Button>打开弹出层</Button>
      </BasePopup>

      <Button onClick={() => popupRef.current?.open()}>
        App ref 打开弹出层
      </Button>
    </>
  )
}

export default App
