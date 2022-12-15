import React from 'react'
import type { InputProps } from 'antd/es/input'
import Input from 'antd/es/input'
import type { ConditionInputCoverProps, ConditionInputProps } from '@template-pro/rc-ui'
import { ConditionInput } from '@template-pro/rc-ui'

export type NumberOnlyInputProps = Omit<InputProps, ConditionInputCoverProps> & Pick<ConditionInputProps, ConditionInputCoverProps>

const REGEX = /\D/g

/**
 * 禁止输入非 Number 内容
 */
function NumberOnlyInput(props: Omit<NumberOnlyInputProps, 'children'>) {
  const {
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props
  return (
    <ConditionInput
      regexes={REGEX}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <Input {...restProps} />
    </ConditionInput>
  )
}

export default Object.assign(NumberOnlyInput, { REGEX })
