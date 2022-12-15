import React from 'react'
import { Col, Radio, Row } from 'antd'
import { mergeProps } from '@template-pro/utils'

const Play = () => {
  const [targetValue, setTargetValue] = React.useState({ value: undefined })
  const [sourceValue, setSourceValue] = React.useState({ value: null })

  const plainOptions = [
    { label: 'Undefined', value: undefined },
    { label: 'Null', value: null },
    { label: 'Empty String', value: '' },
    { label: 'Empty Array', value: [] },
    { label: 'Empty Object', value: {} },
  ] as const

  const result = mergeProps(targetValue, sourceValue)
  window.console.log('targetValue:%o, sourceValue%o, mergeProps=>%o', targetValue, sourceValue, result)

  return (
    <>
      <p>打开控制台看结果</p>
      <Row gutter={24}>
        <Col span={12} key="targetValue">
          <h3>targetValue</h3>
          <Radio.Group onChange={({ target: { value } }) => setTargetValue({ value })} >
            {
              plainOptions.map(({ label, value }) => (
                <Radio value={value} key={label}>{label}</Radio>
              ))
            }
          </Radio.Group>
        </Col>
        <Col span={12} key="sourceValue">
          <h3>sourceValue</h3>
          <Radio.Group onChange={({ target: { value } }) => setSourceValue({ value })} >
            {
              plainOptions.map(({ label, value }) => (
                <Radio value={value} key={label}>{label}</Radio>
              ))
            }
          </Radio.Group>
        </Col>
      </Row>
    </>
  )
}

export default Play
