import Input from 'antd/es/input'
import type { InputProps } from 'antd/es/input'
import React from 'react'
import { ConditionInput } from '@template-pro/rc-ui'
import classNames from 'classnames'
import { useBoolean, useClickAway, useControllableValue } from 'ahooks'
import { defaultPrefixCls } from '../constants'

export interface SearchResultAction {
  close: (clearKeyword?: boolean) => void
}

export interface SearchResultProps {
  children?: React.ReactNode
  onSearch?: (value: string) => void
  searchInput?: InputProps
  className?: string
  resultWrapperClassName?: string
}

const prefixedClassName = `${defaultPrefixCls}-search-result`

const SearchResult = (props: SearchResultProps, ref: React.Ref<SearchResultAction>) => {
  const {
    children,
    searchInput,
    onSearch,
    className,
    resultWrapperClassName,
  } = props

  const [keyword, setKeyword] = useControllableValue(
    { onChange: onSearch }, { defaultValue: '' },
  )

  const searchResultRef = React.useRef<HTMLDivElement>(null)
  const [visibleDropdown, {
    setTrue: openDropdown,
    setFalse: closeDropdown,
  }] = useBoolean(false)

  useClickAway(closeDropdown, searchResultRef)

  const showChildren = keyword.length > 0 && visibleDropdown

  const handlerClose = (clearKeyword?: boolean) => {
    if (clearKeyword)
      setKeyword('')

    closeDropdown()
  }

  React.useImperativeHandle(ref, () => ({ close: handlerClose }), [])

  return (
    <div
      className={classNames(prefixedClassName, className)}
      ref={searchResultRef}
    >
      <ConditionInput
        formatter={value => value.trim()}
        value={keyword}
        onChange={setKeyword}
      >
        <Input
          width="100%"
          placeholder="请输入关键词查找"
          bordered={false}
          {...searchInput}
          onClick={openDropdown}
        />
      </ConditionInput>
      {
        showChildren && (
          <div className={classNames(`${prefixedClassName}-result-wrapper`, resultWrapperClassName)}>
            {children}
          </div>
        )
      }
    </div>
  )
}

export default React.forwardRef(SearchResult)
