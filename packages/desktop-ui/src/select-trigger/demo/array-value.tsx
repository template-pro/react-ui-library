import React from 'react'
import { SelectTrigger } from '@template-pro/desktop-ui'

function App() {
  return (
    <SelectTrigger
      value={[
        { value: <span style={{ color: 'red' }}>红哥</span> },
        { value: '大帅比' },
        { value: '酷毙了' },
      ]}
      style={{ width: 200 }}
    />
  )
}

export default App
