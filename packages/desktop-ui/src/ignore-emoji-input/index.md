# IgnoreEmojiInput

## 基础用法

你可以输入除**表情**以外对任意字符串。

```tsx
/**
 * hideActions: ["CSB", "EXTERNAL"]
 */
import React from 'react'
import { IgnoreEmojiInput } from '@template-pro/desktop-ui'

export default () => (
  <IgnoreEmojiInput placeholder="请输入你的姓名" onChange={console.log} />
)
```

## 其他输入组件进行约束

```tsx
/**
 * hideActions: ["CSB", "EXTERNAL"]
 */
import React from 'react'
import { Input } from 'antd'
import { ConditionInput, IgnoreEmojiInput } from '@template-pro/desktop-ui'

export default () => (
  <ConditionInput onChange={console.log} regexes={IgnoreEmojiInput.REGEX}>
    <Input.TextArea placeholder="请输入你的内容" maxLength={500} showCount />
  </ConditionInput>
)
```
