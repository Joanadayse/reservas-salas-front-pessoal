import React from 'react';
import { SVG_OPTIONS, type SvgIconKey } from './svg.config';

interface SvgIconProps {
  name: SvgIconKey;
  className?: string;
  size?: number;
}
export const SvgIcon: React.FC<SvgIconProps> = ({ name, className, size = 24 }) => {
   const SvgIconComponent = SVG_OPTIONS[name];

return (
  <span className={className} style={{ width: size, height: size }}>
    <SvgIconComponent width={size} height={size} />
  </span>
);

};
