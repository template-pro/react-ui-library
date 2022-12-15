import Modal, { type ModalProps } from 'antd/es/modal';
import { useBoolean } from 'ahooks';
import classNames from 'classnames';
import React, { useImperativeHandle, useRef } from 'react';
import { defaultPrefixCls } from '../constants';

export interface BaseModalAction {
  close: () => void;
  open: () => void;
}

export interface BaseModalProps {
  children?: React.ReactElement;
  modalContent?: React.ReactElement;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    modalAction: BaseModalAction
  ) => void;
  modalProps?: ModalProps;
}

const BaseModal: React.ForwardRefRenderFunction<unknown, BaseModalProps> = (props, ref) => {
  const [modalVisible, { setTrue: open, setFalse: close }] = useBoolean(false);

  const modalActionRef = useRef<BaseModalAction>({ open, close });

  const { children, modalContent, onClick, modalProps = {} } = props;

  const {
    onOk,
    onCancel,
    className,
    footer = null,
    ...restModalProps
  } = modalProps;

  useImperativeHandle(ref, () => modalActionRef.current, [modalActionRef]);

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      return onClick(e, modalActionRef.current);
    }
    return open();
  };

  const handleModalOk = (e: React.MouseEvent<HTMLElement>) => {
    if (onOk) {
      return onOk(e);
    }
    return close();
  };

  const handleModalCancel = (e: React.MouseEvent<HTMLElement>) => {
    if (onCancel) {
      onCancel(e);
    }
    return close();
  };

  const buttonNode =
    children && React.cloneElement(children, { onClick: handleButtonClick });

  const childrenNode =
    modalContent && React.cloneElement(modalContent, { modalAction: modalActionRef.current });

  return (
    <>
      {buttonNode}
      <Modal
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
        className={classNames(`${defaultPrefixCls}-base-modal`, className)}
        footer={footer}
        destroyOnClose
        {...restModalProps}
      >
        {childrenNode}
      </Modal>
    </>
  );
};

export default React.forwardRef(BaseModal);
