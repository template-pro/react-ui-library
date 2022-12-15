import { SetStateAction, useRef } from 'react'
import { useMemoizedFn, useUpdate } from 'ahooks'

export type Options<T> = {
  /** 受控值 */
  value?: T
  /** 默认值 */
  defaultValue: T
  /** 变更回调 */
  onChange?: (v: T) => void
}

function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options

  const update = useUpdate()

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue)
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useMemoizedFn(
    (v: SetStateAction<T>, forceTrigger: boolean = false) => {
      // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
      const nextValue =
        typeof v === 'function'
          ? (v as (prevState: T) => T)(stateRef.current)
          : v
      if (!forceTrigger && nextValue === stateRef.current) return
      stateRef.current = nextValue
      update()
      return onChange?.(nextValue)
    }
  )
  return [stateRef.current, setState] as const
}

export default usePropsValue