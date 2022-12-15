import { isObject, isRegExp, isString } from 'lodash-es'

interface ObjectReg {
  pattern: RegExp;
  replacement?: string;
}

export type Regexe = RegExp | string | ObjectReg;

interface DefaultOption {
  isValid?: boolean;
  replacement?: string;
}

const defaultOptionValues: DefaultOption = {
  isValid: true,
  replacement: '',
};

const parseRegex2RegexOption = (regex: Regexe) => ({
  ...defaultOptionValues,
  pattern: regex,
});

const parseString2RegexOption = (regexString: string) =>
  parseRegex2RegexOption(new RegExp(regexString));

const parse2RegexOption = (regex: Regexe) => {
  if (isRegExp(regex)) {
    return parseRegex2RegexOption(regex);
  }
  if (isString(regex)) {
    return parseString2RegexOption(regex);
  }
  if (isObject(regex)) {
    return {
      ...defaultOptionValues,
      isValid: !!regex.pattern,
      ...regex,
    };
  }
  return { isValid: false, replacement: '', pattern: /./ };
};

export default parse2RegexOption;
