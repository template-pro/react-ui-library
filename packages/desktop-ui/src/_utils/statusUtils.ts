// ref  https://github.com/ant-design/ant-design/blob/51b69283a436378040d7a1640b5b623584cd9df7/components/_util/statusUtils.tsx

import { ValidateStatus } from 'antd/lib/form/FormItem';
import classNames from 'classnames';

const InputStatuses = ['warning', 'error'] as const;
export type InputStatus = typeof InputStatuses[number];

export function getStatusClassNames(
  prefixCls: string,
  status?: ValidateStatus,
  hasFeedback?: boolean,
) {
  return classNames({
    [`${prefixCls}-status__success`]: status === 'success',
    [`${prefixCls}-status__warning`]: status === 'warning',
    [`${prefixCls}-status__error`]: status === 'error',
    [`${prefixCls}-status__validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  });
}

export const getMergedStatus = (contextStatus?: ValidateStatus, customStatus?: InputStatus) =>
  customStatus || contextStatus;