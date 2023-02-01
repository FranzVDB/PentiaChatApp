import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

MaterialIcons.loadFont().catch(error => {
  console.info(error);
});

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

export interface IconProps {
  size: IconSizeProps['iconSizes'];
  name: string;
  color: string;
}

export const IconSizes = {
  small: 13,
  medium: 18,
  large: 23,
  extraLarge: 27,
};

export const MaterialIcon = ({size, name, color}: IconProps) => (
  <MaterialIcons name={name} size={IconSizes[size]} color={color} />
);
