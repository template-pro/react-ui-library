import React from 'react';

export interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean;
  rotate?: number;
}

export interface CustomIconComponentProps {
  width?: string | number;
  height?: string | number;
  fill?: string;
  style?: React.CSSProperties;
  viewBox?: string;
  className?: string;
}

export interface IconProps extends IconBaseProps {
  className?: string;
  component?: React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>;
  viewBox?: string;
  tabIndex?: number;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  prefixCls?: string;
}