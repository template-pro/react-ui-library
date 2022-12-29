import React, { useRef } from 'react'
import { Button } from 'antd'
import type { BaseModalAction } from '@template-pro/desktop-ui'
import { BaseDrawer } from '@template-pro/desktop-ui'

const Content = ({ drawerAction }: any) => (
  <>
    <h3>这是抽屉内容</h3>
    <Button onClick={drawerAction.close}>
      点击关闭抽屉
    </Button>
  </>
)

function BaseModalDemo() {
  const modalRef = useRef<BaseModalAction>()

  return (
    <BaseDrawer
      ref={modalRef}
      drawerProps={{
        title: '标题',
        footer: (
          <Button
            onClick={() => modalRef.current?.close()}>
            通过 Ref 关闭
          </Button>
        ),
      }}
      drawerContent={<Content />}
    >
      <Button>打开抽屉</Button>
    </BaseDrawer>
  )
}

export default BaseModalDemo
