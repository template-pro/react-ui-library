import React from 'react';
import { BaseModal } from '@template-pro/desktop-ui';
import { message, Button } from 'antd';


function BaseModalBaseDemo() {
  return (
    <BaseModal
      modalContent={<>这是弹窗内容</>}
      onClick={(event, modalAction) => {
        window.console.log({ event, modalAction });
        message.info({
          content: '1秒后打开弹窗',
          duration: 1,
          onClose() {
            modalAction.open();
          },
        })
      }}
    >
      <Button>Click me</Button>
    </BaseModal>
  );
}

export default BaseModalBaseDemo;