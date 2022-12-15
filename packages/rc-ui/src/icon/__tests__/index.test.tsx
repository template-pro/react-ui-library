import React from 'react';
import { render, fireEvent } from '../../../../../tests/utils';

import Icon from '..';

describe('Icon', () => {
  it('should support pass svg paths as children', () => {
    const { container } = render(
      <Icon viewBox="0 0 24 24">
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </Icon>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should support event listeners when passing svg paths as children', () => {
    const onClickHandler = jest.fn();
    const onKeyUpHandler = jest.fn();
    const onMouseEnterHandler = jest.fn();

    const { container, getByRole } = render(
      <Icon
        viewBox="0 0 24 24"
        onClick={onClickHandler}
        onKeyUp={onKeyUpHandler}
        onMouseEnter={onMouseEnterHandler}
      >
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </Icon>,
    );
    expect(container).toMatchSnapshot();

    const icon = getByRole('img') as HTMLSpanElement;
    fireEvent.click(icon);
    expect(onClickHandler).toBeCalledTimes(1);
    fireEvent.mouseEnter(icon);
    expect(onMouseEnterHandler).toBeCalledTimes(1);
    fireEvent.keyUp(icon);
    expect(onKeyUpHandler).toBeCalledTimes(1);
  });

  it('should support custom usage of children', () => {
    expect(() => {
      render(<Icon>&E648</Icon>);
    }).not.toThrow();
  });

  it('support render svg as component', () => {
    const renderSvg = () => (
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" />
    );
    const SvgIcon = (props: any) => <Icon component={renderSvg} {...props} />;

    expect(render(<SvgIcon />).container).toMatchSnapshot();
  });

  describe('`component` prop', () => {
    it('can access to svg defs if has children', () => {
      const { container } = render(
        <Icon
          className="my-home-icon"
          component={(svgProps) => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient">
                  <stop offset="20%" stopColor="#39F" />
                  <stop offset="90%" stopColor="#F3F" />
                </linearGradient>
              </defs>
              {React.Children.map(svgProps.children, (child: any) =>
                React.cloneElement(
                  child,
                  child.type === 'path' ? { fill: 'scriptUrl(#gradient)' } : {},
                ),
              )}
            </svg>
          )}
        >
          <title>Cool Home</title>
          <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
        </Icon>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('should support svg react component', () => {
    // children props would make no sense
    const SvgComponent = (props: any) => (
      <svg viewBox="0 0 24 24" {...props}>
        <title>Custom Svg</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );

    const { container } = render(
      <Icon className="my-home-icon" component={SvgComponent}>
        <title>Cool Home</title>
        <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
      </Icon>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should support event listeners', () => {
    const onClickHandler = jest.fn();
    const onKeyUpHandler = jest.fn();
    const onMouseEnterHandler = jest.fn();
    // children props would make no sense
    const SvgComponent = (props: any) => (
      <svg viewBox="0 0 24 24" {...props}>
        <title>Custom Svg</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );

    const { container, getByRole } = render(
      <Icon
        className="my-home-icon"
        component={SvgComponent}
        onClick={onClickHandler}
        onKeyUp={onKeyUpHandler}
        onMouseEnter={onMouseEnterHandler}
      >
        <title>Cool Home</title>
        <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
      </Icon>,
    );
    expect(container).toMatchSnapshot();

    const icon = getByRole('img') as HTMLSpanElement;
    fireEvent.click(icon);
    expect(onClickHandler).toBeCalledTimes(1);
    fireEvent.mouseEnter(icon);
    expect(onMouseEnterHandler).toBeCalledTimes(1);
    fireEvent.keyUp(icon);
    expect(onKeyUpHandler).toBeCalledTimes(1);
  });
});

describe('Render with styles', () => {
  it('icon style will inset top of head', () => {
    const head = document.querySelector('head')!;
    const meta = document.createElement('meta')!;
    head.appendChild(meta);
    render(<Icon component={'Antd' as any} />);
    expect(head.firstElementChild?.tagName).toBe('STYLE');
  })
});