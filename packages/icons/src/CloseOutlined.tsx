import * as React from "react";
import { SVGProps } from "react";
import { Icon, IconProps } from "@template-pro/rc-ui";
function SvgCloseOutlined(componentProps: IconProps) {
  const IconNode = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M884 928.22a43.76 43.76 0 0 1-31.13-12.89L115.56 178.05a44 44 0 0 1 62.16-62.23L915.1 853.13a44 44 0 0 1 0 62.26 43.84 43.84 0 0 1-31.1 12.83z" />
      <path d="M146.69 928.22a44 44 0 0 1-31.14-75.16L852.9 115.79a44 44 0 0 1 62.17 0 44 44 0 0 1 0 62.19L177.62 915.33a43.75 43.75 0 0 1-30.93 12.89z" />
    </svg>
  );
  return <Icon {...componentProps} component={IconNode} />;
}
SvgCloseOutlined.displayName = "CloseOutlined";
export default SvgCloseOutlined;
