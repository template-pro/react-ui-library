const template = (variables, { tpl }) => {
  const {
    componentName,
    imports,
    interfaces,
    jsx,
    exports,
  } = variables

  return tpl`
${imports};

${interfaces};
import { Icon, IconProps } from '@template-pro/rc-ui';

function ${componentName}(componentProps: IconProps) {
  const IconNode = (props: SVGProps<SVGSVGElement>) => ${jsx};
  return <Icon {...componentProps} component={IconNode} />;
}

${componentName}.displayName = '${componentName.replace(/^Svg/, '')}'
${exports};
`
}

module.exports = template
