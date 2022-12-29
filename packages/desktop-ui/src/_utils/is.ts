import React from 'react'

export function isElement<P>(element: any): element is React.ReactElement<P> {
  return React.isValidElement(element)
}

export function isDOMTypeElement<
  P extends React.HTMLAttributes<T> | React.SVGAttributes<T>,
  T extends Element,
>(element: any): element is React.DOMElement<P, T> {
  return isElement(element) && typeof element.type === 'string'
}
