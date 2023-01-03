import React from 'react'
import { BaseMask } from '@template-pro/mobile-ui'
import { Button, Toast } from 'antd-mobile'
import styles from './style.less'

export default () => (
  <>
    <BaseMask
      trigger={<Button>Click me</Button>}
      onClick={(event, action) => {
        window.console.log({ event, action })
        Toast.show({
          content: '1秒后打开背景蒙层',
          icon: 'loading',
          duration: 1000,
          afterClose() {
            action.open()
            setTimeout(() => {
              Toast.show({
                content: '1秒后关闭背景蒙层',
                duration: 1000,
                afterClose: action.close,
              })
            }, 500)
          },
        })
      }}
    >
      <div className={styles.overlayContent}>这是背景蒙层内容</div>
    </BaseMask>
  </>
)
