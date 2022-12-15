import { reRgiEmoji } from '..'

describe('reRgiEmoji', () => {
  it('should pass', () => {
    expect(reRgiEmoji.test('1')).toBe(false)
    expect(reRgiEmoji.test('😄')).toBe(true)
  })
})
