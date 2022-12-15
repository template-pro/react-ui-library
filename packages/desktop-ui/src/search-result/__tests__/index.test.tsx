import React from 'react'
import SearchResult from '..'
import { render } from '../../../../../tests/utils'

describe('SearchResult', () => {
  it('should work', () => {
    const { container } = render(<SearchResult />)
    expect(container).toMatchSnapshot()
  })
})
