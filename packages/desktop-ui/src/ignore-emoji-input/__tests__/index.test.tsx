import React from 'react'
import IgnoreEmojiInput from '..'
import { fireEvent, render } from '../../../../../tests/utils'

describe('ignore-emoji-input', () => {
  it('should work', () => {
    const onChangeFn = jest.fn()
    const { getByRole } = render(<IgnoreEmojiInput onChange={onChangeFn}/>)

    const input = getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '😊' } })

    expect(input.value).toBe('')
    expect(onChangeFn).toBeCalledWith('')

    fireEvent.change(input, { target: { value: 'hello123' } })
    expect(input.value).toBe('hello123')
    expect(onChangeFn).toBeCalledWith('hello123')

    fireEvent.change(input, { target: { value: '你好' } })
    expect(input.value).toBe('你好')
    expect(onChangeFn).toBeCalledWith('你好')
  })

  it('应该存在属性 REGEX, 并且为正则', () => {
    expect(IgnoreEmojiInput.REGEX).toBeInstanceOf(RegExp)
  })
})
