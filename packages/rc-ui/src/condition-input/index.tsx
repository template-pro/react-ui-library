import React from 'react';
import { isFunction } from 'lodash-es';
import parse2RegexOption, { Regexe } from './parse2RegexOption';
import { usePropsValue } from '@template-pro/utils'

interface BasicProps<T = any> {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
}

export interface ConditionInputProps extends BasicProps<string> {
  regexes?: Regexe[] | Regexe;
  formatter?: (value: string) => any
  children: React.ReactElement<BasicProps<string>>;
}

export type CoverProps = keyof Omit<ConditionInputProps, 'regexes'>

const ConditionInput = (props: ConditionInputProps) => {
  const {
    value,
    defaultValue,
    onChange,
    regexes,
    children,
    formatter,
  } = props;

  const [stateValue, setStateValue] = usePropsValue({ value, defaultValue, onChange })

  const handleChange = (e: any) => {
    const { value: originalValue } = e.target;
    let nextValue = originalValue;

    if (regexes) {
      nextValue = (Array.isArray(regexes) ? regexes : [regexes]).reduce(
        (cur, acc) => {
          const regexOption = parse2RegexOption(acc);
          if (regexOption?.isValid) {
            return cur.replace(regexOption.pattern, regexOption.replacement);
          }
          return cur;
        },
        originalValue
      );
    }

    if (isFunction(formatter)) {
      nextValue = formatter(nextValue);
    }

    setStateValue(nextValue);
  };

  return React.cloneElement(children, {
    value: stateValue,
    onChange: handleChange,
  });
};

export default ConditionInput
