import React from 'react'
import { isDOMTypeElement, isElement } from '..'

describe('is', () => {
  it('isElement working', () => {
    expect(isElement(<div />)).toBeTruthy()

    expect(isElement('div')).toBeFalsy()
    expect(isElement(1)).toBeFalsy()
    expect(isElement(true)).toBeFalsy()
  })

  it('isDOMTypeElement working', () => {
    expect(isDOMTypeElement(<div />)).toBeTruthy()
    expect(isDOMTypeElement('div')).toBeFalsy()
    expect(isDOMTypeElement(1)).toBeFalsy()
    expect(isDOMTypeElement(true)).toBeFalsy()
  })
})
