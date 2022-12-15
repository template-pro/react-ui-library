import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Card, Form, InputNumber, Switch, Tabs, message } from 'antd'
import type { FormProps } from 'antd'
import { TwitterPicker } from 'react-color'
import { pick } from 'lodash-es'
import iconsList from './iconsList'
import './index.less'

const defaultProps = {
  color: '#eb4e4e',
  width: 64,
}

const { TabPane } = Tabs

const ColorPicker = (props: any) => {
  const { onChange, ...resetProps } = props
  return <TwitterPicker {...resetProps} onChange={({ hex }) => onChange(hex)} />
}

export default () => {
  const [iconProps, setIconProps] = useState<any>(() => defaultProps)

  const handleChange: FormProps['onValuesChange'] = (_, allValues) => {
    setIconProps(allValues)
  }

  const outlinedIcons = React.useMemo(
    () => iconsList.filter(({ displayName }) => displayName.endsWith('Outlined')),
    [iconsList],
  )

  const filledIcons = React.useMemo(
    () => iconsList.filter(({ displayName }) => displayName.endsWith('Filled')),
    [iconsList],
  )

  const configFormNode = (
    <Form layout="inline" onValuesChange={handleChange} initialValues={defaultProps}>
      <Form.Item label="颜色" name="color" valuePropName='color'>
        <ColorPicker />
      </Form.Item>
      <Form.Item label="宽度" name="width">
        <InputNumber max={256} min={12} placeholder='尺寸' step={6} />
      </Form.Item>
      <Form.Item label="旋转动画" name="spin" valuePropName='checked'>
        <Switch />
      </Form.Item>
    </Form>
  )

  const renderIcon = React.useCallback(
    (icon: React.FunctionComponent<any>, index: number) => {
      const copyText
        = `<${icon.displayName} style={${JSON.stringify(pick(iconProps, ['width', 'color']))}} />`

      return (
        <CopyToClipboard
          key={index}
          text={copyText}
          onCopy={() => message.info(`copy <${icon.displayName} /> success`)}
        >
          <Card hoverable style={{ width: Math.max(190, iconProps.width), display: 'inline-block' }}>
            <div className="icons-item">
              {
                React.createElement(icon, {
                  style: pick(iconProps, ['width', 'color']),
                  spin: iconProps.spin,
                })
              }
              <span>{icon.displayName}</span>
            </div>
          </Card>
        </CopyToClipboard>
      )
    },
    [iconProps],
  )

  const tabs = React.useMemo(() => [
    { tab: '所有图标', key: 'all', list: iconsList },
    { tab: '线框风格', key: 'outline', list: outlinedIcons },
    { tab: '实底风格', key: 'filled', list: filledIcons },
  ], [iconsList, outlinedIcons, filledIcons])

  return (
    <div>
      {configFormNode}
      <br />
      <br />
      <Tabs defaultActiveKey="all" className='__icons-dome-container'>
        {
          tabs.map(({ tab, key, list }) => (
            <TabPane tab={tab} key={key} >
              {list.map(renderIcon)}
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  )
}
