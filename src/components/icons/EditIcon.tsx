import React, { FC } from 'react';

import { IconProps } from './icon.types';

export const EditIcon: FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447L0 10.2929V14.5C0 14.7761 0.223858 15 0.5 15H4.70711L14.8536 4.85355C15.0488 4.65829 15.0488 4.34171 14.8536 4.14645L10.8536 0.146447Z"
        fill={fill}
      />
    </svg>
  );
};
