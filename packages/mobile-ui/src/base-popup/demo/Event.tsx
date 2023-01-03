import React from 'react'
import { BasePopup } from '@template-pro/mobile-ui'
import { Button, Toast } from 'antd-mobile'

export default () => (
  <>
    <BasePopup
      content={<span style={{ height: '10vh', display: 'inline-block' }}>这是弹出层内容</span>}
      triggerClick={(event, action) => {
        window.console.log({ event, action })
        Toast.show({
          content: '1秒后打开弹出层',
          icon: 'loading',
          duration: 1000,
          afterClose: action.open,
        })
      }}
    >
      <Button>Click me</Button>
    </BasePopup>
  </>
)
