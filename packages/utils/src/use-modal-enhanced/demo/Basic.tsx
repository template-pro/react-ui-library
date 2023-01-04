import React from 'react'
import type { UseModalEnhancedAction, UseModalEnhancedContent, UseModalEnhancedProps } from '@template-pro/utils'
import { useModalEnhanced } from '@template-pro/utils'
import type { ModalProps } from './Modal'
import Modal from './Modal'

type EnhancedModalProps = ModalProps & UseModalEnhancedProps

const EnhancedModal = (props: EnhancedModalProps) => {
  const [
    visible,
    { close },
    { content, trigger },
  ] = useModalEnhanced(props)

  return (
    <>
      {trigger}
      <Modal
        visible={visible}
        title="EnhancedModal"
        {...props}
        onClose={close}
      >
        {content}
      </Modal>
    </>
  )
}

// Final usage
const Content = ({ enhancedAction }: Partial<UseModalEnhancedContent>) => (
  <>
    hello world
    <p>Content</p>
    <button onClick={enhancedAction?.close}>Content Close</button>
  </>
)

function App() {
  const actionRef = React.useRef<UseModalEnhancedAction>(null)

  return (
    <>
      <EnhancedModal
        actionRef={actionRef}
        content={<Content />}
      >
        <button>App Trigger</button>
      </EnhancedModal>

      <button onClick={() => actionRef.current?.open()}>App actionRef.open</button>
    </>
  )
}

export default App
