import React from 'react'
import { ConditionInput } from '@template-pro/rc-ui'

const App = () => {
  const onChange = (value: string) => {
    console.log('返回值:', value)
  }

  return (
    <>
      <p>单个正则(只能输入数字和字母)</p>
      <ConditionInput regexes={/[^\dA-Za-z]+/g} onChange={onChange} >
        <input type="text" />
      </ConditionInput>

      <p>多个正则(前后不允许空格且不能能输入数字)</p>
      <ConditionInput regexes={['\\s', /\d/g]} onChange={onChange} >
        <input type="text" />
      </ConditionInput>

      <p>自定义不符合规则的字的替换值(如果输入数字则替换成*)</p>
      <ConditionInput
        regexes={[{ pattern: /\d/g, replacement: '*' }]}
        onChange={onChange}
      >
        <input type="text" />
      </ConditionInput>
    </>
  )
}

export default App
