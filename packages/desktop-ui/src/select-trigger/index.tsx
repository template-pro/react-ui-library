import DisabledContext from 'antd/es/config-provider/DisabledContext';
import SizeContext, { SizeType } from 'antd/es/config-provider/SizeContext';
import { FormItemInputContext } from 'antd/es/form/context';
import { CloseCircleFilled } from '@template-pro/icons'
import classNames from 'classnames';
import React, { useContext } from 'react';
import { defaultPrefixCls } from '../constants';
import { getMergedStatus, getStatusClassNames, InputStatus } from '../_utils/statusUtils';

type Value = Record<string, any>;

export interface SelectTriggerProps<V extends Value = Value> {
  value?: string | V[],
  allowClear?: boolean,
  onClear?: () => void,
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
  disabled?: boolean,
  itemRender?: (item: V, index: number) => React.ReactNode,
  /**
   * @default 、
   */
  separator?: React.ReactNode,
  className?: string,
  placeholder?: string,
  /**
   * @default large
   */
  size?: SizeType;
  style?: React.CSSProperties;
  status?: InputStatus;
  /**
   * @default 选择
   */
  selectText?: string;
}

const prefixedClassName = `${defaultPrefixCls}-select-trigger`;

function SelectTrigger<V extends Value>(
  props: SelectTriggerProps<V>
) {
  const {
    value,
    allowClear,
    onClear,
    onClick,
    disabled: customDisabled,
    itemRender = ({ value }) => value,
    separator = '、',
    className,
    placeholder,
    size: customSize = 'large',
    style,
    status: customStatus,
    selectText = '选择',
  } = props;

  const disabled = useContext(DisabledContext);
  const { status: contextStatus } = useContext(FormItemInputContext);
  const size = useContext(SizeContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const mergedSize = customSize || size;

  const mergedDisabled = customDisabled || disabled;

  const values = (Array.isArray(value) ? value : [{ value } as any])
    .reduce((nodes, item, index, _values) => {
      const itemNode = itemRender(item, index);

      if (itemNode) {
        nodes.push(itemNode);

        if (nodes.length % 2 && index < _values.length - 1) {
          nodes.push(separator);
        }
      }

      return nodes;
    }, []);

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mergedDisabled) {
      onClick?.(event);
    }
  };

  const showValues = values.length > 0;
  const showClearIcon = allowClear && !mergedDisabled && showValues;

  return (
    <div
      className={classNames(
        prefixedClassName,
        {
          [`${prefixedClassName}-disabled`]: mergedDisabled,
          [`${prefixedClassName}-size__sm`]: mergedSize === 'small',
          [`${prefixedClassName}-size__lg`]: mergedSize === 'large',
          [`${prefixedClassName}-size__md`]: mergedSize === 'middle',
        },
        className,
        getStatusClassNames(prefixedClassName, mergedStatus)
      )}
      onClick={clickHandler}
      tabIndex={0}
      style={style}
    >
      {
        showValues
          ? <p className={`${prefixedClassName}-value`}>{values}</p>
          : <p className={`${prefixedClassName}-placeholder`}>{placeholder}</p>
      }
      <span className={`${prefixedClassName}-suffix`}>
        <span
          className={classNames(
            `${prefixedClassName}-select-text`,
            { [`${prefixedClassName}-select-text-control`]: showClearIcon }
          )}
        >
          {selectText}
        </span>
        {showClearIcon && (
          <i className={`${prefixedClassName}-icon`}>
            <CloseCircleFilled
              style={{ width: 16, height: 16, color: '#b7b7b7' }}
              onClick={(event: any) => {
                event.stopPropagation();
                onClear?.();
              }}
            />
          </i>
        )}
      </span>
    </div>
  );
}

export default SelectTrigger;