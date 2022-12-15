import parse2RegexOption from '../parse2RegexOption';

describe('parse2RegexOption', () => {
  it('when params is RegExp', () => {
    expect(parse2RegexOption(/\d/)).toEqual({ isValid: true, pattern: /\d/, replacement: '' });
  });

  it('when params is string', () => {
    expect(parse2RegexOption('\\s')).toEqual({ isValid: true, pattern: /\s/, replacement: '' });
  });

  it('when params is object', () => {
    expect(parse2RegexOption({ pattern: /\d/g, replacement: 'p' })).toEqual({
      isValid: true,
      pattern: /\d/g,
      replacement: 'p',
    });
  });

  it('when params is any', () => {
    expect(parse2RegexOption(undefined as any)).toEqual({
      isValid: false,
      pattern: /./,
      replacement: '',
    });
  });
});
