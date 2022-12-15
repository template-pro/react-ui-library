import React, { useRef } from 'react';
import { Button } from 'antd'
import { BaseModal, BaseModalAction } from '@template-pro/desktop-ui';

const Content = ({ modalAction }: any) => (
  <>
    <h3>这是弹框内容</h3>
    <Button onClick={modalAction.close}>
      点击关闭弹框
    </Button>
  </>
);


function BaseModalDemo() {
  const modalRef = useRef<BaseModalAction>();

  return (
    <BaseModal
      ref={modalRef}
      modalProps={{
        title: '标题',
        footer: (
          <Button
            onClick={() => modalRef.current?.close()}>
            通过 Ref 关闭
          </Button>
        ),
      }}
      modalContent={<Content />}
    >
      <Button>打开弹窗</Button>
    </BaseModal>
  );
}

export default BaseModalDemo;