import React from 'react';
import NumberOnlyInput from '..'
import { fireEvent, render } from '../../../../../tests/utils';

describe('number-only-input', () => {

  it('should work', () => {
    const onChangeFn = jest.fn();
    const { getByRole } = render(<NumberOnlyInput onChange={onChangeFn}/>);

    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '😊' } });

    expect(input.value).toBe('');
    expect(onChangeFn).toBeCalledWith('');

    fireEvent.change(input, { target: { value: 'hello123' } });
    expect(input.value).toBe('123');
    expect(onChangeFn).toBeCalledWith('123');

    fireEvent.change(input, { target: { value: '你好' } });
    expect(input.value).toBe('');
    expect(onChangeFn).toBeCalledWith('');
  })

  it('应该存在属性 REGEX, 并且为正则', () => {
    expect(NumberOnlyInput.REGEX).toBeInstanceOf(RegExp);
  })
})