import React from 'react'
import { BaseModal } from '@template-pro/desktop-ui'
import { Button, message } from 'antd'

function App() {
  return (
    <BaseModal
      content="这是弹窗内容"
      onClick={(event, action) => {
        window.console.log({ event, action })
        message.info({
          content: '1秒后打开弹窗',
          duration: 1,
          onClose: action.open,
        })
      }}
    >
      <Button>Click me</Button>
    </BaseModal>
  )
}

export default App
