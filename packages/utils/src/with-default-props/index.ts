import { assign, assignWith, isUndefined } from 'lodash-es'

/**
 * 仅针对 undefined 值进行合并
 */
function mergeProps<A, B>(a: A, b: B): B & A
function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A
function mergeProps(...items: any[]) {
  function customizer(objValue: any, srcValue: any) {
    return isUndefined(srcValue) ? objValue : srcValue
  }

  let ret = assign({}, items[0])
  for (let i = 1; i < items.length; i++)
    ret = assignWith(ret, items[i], customizer)

  return ret
}

export default mergeProps
