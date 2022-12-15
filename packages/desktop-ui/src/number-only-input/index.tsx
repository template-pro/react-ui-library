import React from 'react';
import Input, { InputProps } from 'antd/es/input';
import { ConditionInput, ConditionInputProps, ConditionInputCoverProps } from '@template-pro/rc-ui';

export type NumberOnlyInputProps = Omit<InputProps, ConditionInputCoverProps> & Pick<ConditionInputProps, ConditionInputCoverProps>

const REGEX = /\D/g;

/**
 * 禁止输入非 Number 内容
 */
function NumberOnlyInput(props: Omit<NumberOnlyInputProps, 'children'>) {
  const {
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props;
  return (
    <ConditionInput
      regexes={REGEX}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <Input {...restProps} />
    </ConditionInput>
  );
}

export default Object.assign(NumberOnlyInput, { REGEX });