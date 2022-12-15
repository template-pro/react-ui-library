import React from 'react';
import { render, fireEvent } from '../../../../../tests/utils';
import ConditionInput from '..';

const baseProps = {
  onChange: jest.fn(),
  children: <input type="text" />,
};

describe('ConditionInput', () => {
  it('formatter', () => {
    const { getByRole } = render(
      <ConditionInput
        regexes={/[^A-Za-z]+/g}
        formatter={(value) => value.toUpperCase()}
        {...baseProps}
      />,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('HELLOWORLD');
    expect(baseProps.onChange).toBeCalledWith('HELLOWORLD');
  });

  it('regexes is string array', () => {
    const { getByRole } = render(<ConditionInput regexes={['\\d']} {...baseProps} />);
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'hello world 2022' } });
    expect(input.value).toBe('hello world 022');
    expect(baseProps.onChange).toBeCalledWith('hello world 022');
  });

  it('regexes is object array', () => {
    const { getByRole } = render(
      <ConditionInput regexes={[{ pattern: /\d/g, replacement: '*' }]} {...baseProps} />,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'hello world 2022' } });
    expect(input.value).toBe('hello world ****');
    expect(baseProps.onChange).toBeCalledWith('hello world ****');
  });

  it('when regexes is any', () => {
    const { getByRole } = render(<ConditionInput regexes={[undefined as any]} {...baseProps} />);
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'hello world 2022' } });
    expect(input.value).toBe('hello world 2022');
    expect(baseProps.onChange).toBeCalledWith('hello world 2022');
  });
});
