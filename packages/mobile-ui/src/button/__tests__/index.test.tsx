import React from 'react'
import Button from '..'
import { fireEvent, render } from '../../../../../tests/utils'

describe('Button Props', () => {
  it('custom classname should take effect', () => {
    const { container } = render(<Button className="custom-classname" />)
    expect(container.querySelectorAll('.custom-classname').length).toBe(1)
  })

  it('click under disable should not trigger click event', () => {
    const onClick = jest.fn()
    const { container } = render(
      <Button onClick={onClick} disabled>
        click me
      </Button>,
    )
    fireEvent.click(container.firstChild!)
    expect(onClick).not.toHaveBeenCalled()
  })
})
