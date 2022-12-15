# NumberOnlyInput

## 基础用法

你**只能输入数字**，其他非数字输入无效。

```tsx
/**
 * hideActions: ["CSB", "EXTERNAL"]
 */
import React from 'react'
import { NumberOnlyInput } from '@template-pro/desktop-ui'

export default () => (
  <NumberOnlyInput placeholder="请输入手机号" maxLength={11} />
)
```
