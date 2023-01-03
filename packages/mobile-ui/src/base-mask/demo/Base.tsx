import React, { useRef } from 'react'
import type { UseModalEnhancedAction, UseModalEnhancedContext } from '@template-pro/mobile-ui'
import { BaseMask } from '@template-pro/mobile-ui'
import { Button } from 'antd-mobile'
import styles from './style.less'

const Content = ({ enhancedAction }: Partial<UseModalEnhancedContext>) => (
  <div className={styles.overlayContent}>
    <h3>这是背景蒙层内容</h3>
    <Button onClick={enhancedAction?.close}>
      点击关闭背景蒙层
    </Button>
  </div>
)

function App() {
  const maskRef = useRef<UseModalEnhancedAction>(null)
  return (
    <>
      <BaseMask
        trigger={<Button>打开背景蒙层</Button>}
        actionRef={maskRef}
        onMaskClick={() => window.console.log('点击了背景蒙层')}
      >
        <Content />
      </BaseMask>

      <Button onClick={() => maskRef.current?.open()}>App ref 打开背景蒙层</Button>
    </>
  )
}

export default App
