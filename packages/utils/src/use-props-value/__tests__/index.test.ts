import { act, renderHook } from '@testing-library/react-hooks'
import usePropsValue, { type Options } from '..'

describe('usePropsValue', () => {
  const setUp = (props: Options<any>): any =>
    renderHook(() => usePropsValue(props))

  it('defaultValue should work', () => {
    const hook = setUp({ defaultValue: 1 })
    expect(hook.result.current[0]).toEqual(1)
  })

  it('value should work', () => {
    const hook = setUp({ defaultValue: 1, value: 2 })
    expect(hook.result.current[0]).toEqual(2)
  })

  it('state should be undefined', () => {
    const hook = setUp({ defaultValue: undefined })
    expect(hook.result.current[0]).toBeUndefined()
  })

  it('onChange should work', () => {
    const onChange = jest.fn()
    const props = {
      value: 2,
      onChange,
      defaultValue: 1,
    }
    const hook = setUp(props)
    expect(hook.result.current[0]).toEqual(2)
    act(() => {
      hook.result.current[1](3)
    })
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe(3)
  })

  it('test on state update', () => {
    const props: any = {
      value: 1,
    }
    const { result, rerender } = setUp(props)
    props.value = 2
    rerender(props)
    expect(result.current[0]).toEqual(2)
    props.value = 3
    rerender(props)
    expect(result.current[0]).toEqual(3)
  })

  it('type inference should work', async () => {
    interface Value {
      foo: number
    }
    const props: {
      value: Value
      defaultValue: Value
      onChange: (val: Value) => void
    } = {
      value: {
        foo: 123,
      },
      defaultValue: {
        foo: 123,
      },
      onChange: () => {},
    }
    const hook = renderHook(() => usePropsValue(props))
    const [v] = hook.result.current
    expect(v.foo).toBe(123)
  })
})
