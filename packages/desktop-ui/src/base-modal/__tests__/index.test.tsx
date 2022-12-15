import { useUnmount } from 'ahooks'
import React from 'react'
import BaseModal from '..'
import { act, fireEvent, render, sleep } from '../../../../../tests/utils'

describe('BaseModal', () => {
  const clear = async function clear() {
    await act(async () => {
      jest.runAllTimers()
      await sleep()
    })
  }

  it('custom classname should take effect', () => {
    render(
      <BaseModal
        modalProps={{ visible: true, className: 'custom-classname' }}
      />,
    )

    expect(document.body.querySelectorAll('.custom-classname').length).toBe(1)
  })

  it('click children should open modal', async () => {
    const Demo = () => {
      return (
        <BaseModal
          modalProps={{ className: 'modal-open' }}
        >
          <button className='open-modal-btn'>open</button>
        </BaseModal>
      )
    }

    const { container } = render(<Demo />)

    fireEvent.click(container.querySelectorAll('.open-modal-btn')[0])

    await clear()

    expect(document.body.querySelectorAll('.modal-open')).toHaveLength(1)
  })

  it('默认情况下，点击关闭时应该销毁弹窗内容', async () => {
    const unMountFn = jest.fn()

    const Content = () => {
      useUnmount(unMountFn)
      return <>Content</>
    }

    const { container } = render(
      <BaseModal modalContent={<Content />}>
        <button className='open-modal-btn'>open</button>
      </BaseModal>,
    )

    fireEvent.click(container.querySelectorAll('.open-modal-btn')[0])

    await clear()

    // Click the close icon to close
    fireEvent.click(document.body.querySelectorAll('.ant-modal-close')[0])

    await clear()

    expect(unMountFn).toHaveBeenCalled()
  })

  it('存在 onClick 时，点击触发器应该触发 onClick 事件，默认不打开弹窗，需手动打开', async () => {
    const onClick = jest.fn()
    const { container } = render(
      <BaseModal
        onClick={onClick}
        modalProps={{ className: 'modal-open' }}
      >
        <button className='open-modal-btn'>open</button>
      </BaseModal>,
    )

    fireEvent.click(container.querySelectorAll('.open-modal-btn')[0])

    await clear()

    expect(document.body.querySelectorAll('.modal-open')).toHaveLength(0)

    expect(onClick).toHaveBeenCalled()
    expect(onClick.mock.calls[0][1]).toEqual({
      open: expect.any(Function),
      close: expect.any(Function),
    })

    onClick.mockImplementation((_, modalAction) => {
      modalAction.open()
    })

    fireEvent.click(container.querySelectorAll('.open-modal-btn')[0])

    expect(document.body.querySelectorAll('.modal-open')).toHaveLength(1)
  })
})
