import React from 'react'
import { BaseDrawer } from '@template-pro/desktop-ui'
import { Button, message } from 'antd'

function BaseModalBaseDemo() {
  return (
    <BaseDrawer
      drawerContent="这是抽屉内容"
      onClick={(event, drawerAction) => {
        window.console.log({ event, drawerAction })
        message.info({
          content: '1秒后打开抽屉',
          duration: 1,
          onClose() {
            drawerAction.open()
          },
        })
      }}
    >
      <Button>Click me</Button>
    </BaseDrawer>
  )
}

export default BaseModalBaseDemo
