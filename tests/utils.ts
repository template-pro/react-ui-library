import { ReactElement,StrictMode } from "react";
import { act, RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode, ...options });

export { customRender as render };

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => {
      global.setTimeout(resolve, timeout);
    });
  });
};

export * from '@testing-library/react';