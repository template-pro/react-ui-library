import React from 'react'
import { SelectTrigger } from '@template-pro/desktop-ui'
import './custom-render.less'

function App() {
  return (
    <SelectTrigger
      value={[
        { value: '大哥' },
        { value: '大帅比' },
        { value: '酷毙了' },
      ]}
      itemRender={item => (
        <i className='__select-trigger__custom_render red'>{item.value}</i>
      )}
      separator={<i className='__select-trigger__custom_render green'>、</i>}
      style={{ width: 200 }}
    />
  )
}

export default App
