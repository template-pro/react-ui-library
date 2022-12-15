import React from 'react';
import SelectTrigger from '..'
import { fireEvent, render } from '../../../../../tests/utils';
import { defaultPrefixCls } from '../../constants';

describe('SelectTrigger', () => {
  it('正确 render', () => {
    const { container } = render(<SelectTrigger />)
    expect(container).toMatchSnapshot()
  })

  it('点击时应该触发点击事情', () => {
    const onClick = jest.fn()
    const { container } = render(<SelectTrigger onClick={onClick} />)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalled()
  })

  it('支持数组和字符串格式 value', () => {
    const stringValue = 'hello world'

    const arrayValue = [
      { value: 'hello' },
      { value: 'world' },
    ]

    const { container, rerender } = render(<SelectTrigger value={stringValue} />)

    const getValueNode = (body: any) => body.querySelector(`.${defaultPrefixCls}-select-trigger-value`)
    expect(getValueNode(container)).toMatchSnapshot()

    rerender(<SelectTrigger value={arrayValue} />)
    expect(getValueNode(container)).toMatchSnapshot()
  })
})