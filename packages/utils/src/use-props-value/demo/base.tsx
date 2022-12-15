import React from 'react'
import { usePropsValue } from '@template-pro/utils'
import { useState } from 'react'

interface Props<T = string> {
  value?: T,
  onChange?: (value: T) => void,
  defaultValue?: T,
}

function MyInput(props: Props) {
  const { value, defaultValue, onChange } = props

  const [state, setState] = usePropsValue({
    onChange,
    value,
    defaultValue: defaultValue ?? '',
  })

  return <input value={state} onChange={(event) => setState(event.target.value)} />
}

function App() {
  const [value, setValue] = useState('base')
  return (
    <div>
      <p>非受控</p>
      <MyInput />

      <br />

      <p>受控</p>
      <MyInput value={value} onChange={setValue} />
      <code>{JSON.stringify({ value }, null, 2)}</code>
    </div>
  )
}

export default App