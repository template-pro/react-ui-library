import type { ReactElement } from 'react'
import { StrictMode } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { act, render } from '@testing-library/react'

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode as any, ...options })

export { customRender as render }

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise((resolve) => {
      global.setTimeout(resolve, timeout)
    })
  })
}

export * from '@testing-library/react'
