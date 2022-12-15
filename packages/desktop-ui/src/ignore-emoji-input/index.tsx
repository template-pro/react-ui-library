import React from 'react'
import type { InputProps } from 'antd/es/input'
import Input from 'antd/es/input'
import type { ConditionInputCoverProps, ConditionInputProps } from '@template-pro/rc-ui'
import { ConditionInput } from '@template-pro/rc-ui'
import { anyRule } from '@template-pro/utils'

export type IgnoreEmojiInputProps = Omit<InputProps, ConditionInputCoverProps> & Pick<ConditionInputProps, ConditionInputCoverProps>

/**
 * 过滤 emoji 字符输入
 */
function IgnoreEmojiInput(props: Omit<IgnoreEmojiInputProps, 'children'>) {
  const {
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props
  return (
    <ConditionInput
      regexes={anyRule.reRgiEmoji}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <Input {...restProps} />
    </ConditionInput>
  )
}

export default Object.assign(IgnoreEmojiInput, { REGEX: anyRule.reRgiEmoji })
