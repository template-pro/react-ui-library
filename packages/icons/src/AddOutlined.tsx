import * as React from "react";
import { SVGProps } from "react";
import { Icon, IconProps } from "@template-pro/rc-ui";
function SvgAddOutlined(componentProps: IconProps) {
  const IconNode = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M864.63 544.13H160.21a32 32 0 0 1 0-64h704.42a32 32 0 0 1 0 64z" />
      <path d="M512.42 896.33a32 32 0 0 1-32-32V159.92a32 32 0 0 1 64 0v704.41a32 32 0 0 1-32 32z" />
    </svg>
  );
  return <Icon {...componentProps} component={IconNode} />;
}
SvgAddOutlined.displayName = "AddOutlined";
export default SvgAddOutlined;
