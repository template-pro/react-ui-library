import React from 'react'
import { BaseDrawer } from '@template-pro/desktop-ui'
import { Button, message } from 'antd'

function App() {
  return (
    <BaseDrawer
      content="这是抽屉内容"
      onClick={(event, action) => {
        window.console.log({ event, action })
        message.info({
          content: '1秒后打开抽屉',
          duration: 1,
          onClose: action.open,
        })
      }}
    >
      <Button>Click me</Button>
    </BaseDrawer>
  )
}

export default App
