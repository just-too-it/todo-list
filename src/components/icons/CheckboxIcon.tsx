import React, { FC } from 'react';

import { IconProps } from './icon.types';

export const CheckboxIcon: FC<IconProps> = ({ width, height, fill }) => {
  return (
<svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g>
        <path fill={fill} d="M0 0h24v24H0z"/>
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/>
    </g>
</svg>
  );
};