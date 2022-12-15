import React from 'react'
import type { ButtonProps as AntmButtonProps } from 'antd-mobile/es/components/button'
import AntmButton from 'antd-mobile/es/components/button'
import classNames from 'classnames'
import { defaultPrefixCls } from '../constants'

type ButtonProps = AntmButtonProps

const Button = (props: ButtonProps) => {
  const { className, ...resetProps } = props
  return (
    <AntmButton
      className={classNames(`${defaultPrefixCls}-button`, className)}
      {...resetProps}
    />
  )
}

export type { ButtonProps }
export default Button
