import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Green, Palette} from './colors';

export const NavAddIcon = () => {
  return (
    <FontAwesome5 style={styles.link} size={20} name={'plus'} color={Green} />
  );
};

export const NavBackIcon = () => {
  return (
    <FontAwesome5
      style={styles.link}
      size={20}
      name={'chevron-left'}
      color={Palette.common.white}
    />
  );
};

export const NavCloseIcon = () => {
  return (
    <FontAwesome5 style={styles.link} size={20} name={'times'} color={Green} />
  );
};

export const ChevronRight = props => {
  const color: string = props.color ?? Green;
  return (
    <FontAwesome5
      style={styles.link}
      size={20}
      name={'chevron-right'}
      color={color}
    />
  );
};

export const Bolt = props => {
  const color: string = props.color ?? Green;
  const size: number = props.size ?? 40;

  return (
    <FontAwesome5 style={styles.link} size={size} name={'bolt'} color={color} />
  );
};

type IconStyle = 'regular' | 'light' | 'solid' | 'brand';

type IconProps = {
  style?: ViewStyle;
  color?: string;
  size?: number;
  name?: string;
  iconStyle?: IconStyle;
};

export const FontAwesomeIcon: React.FC<IconProps> = props => {
  const style: ViewStyle = props.style ?? {};
  const color: string = props.color ?? Green;
  const size: number = props.size ?? 40;
  const name: string = props.name ?? 'times';
  const iconStyle: IconStyle = props.iconStyle ?? 'regular';

  if (iconStyle === 'light') {
    return (
      <FontAwesome5
        style={[styles.link, style]}
        size={size}
        name={name}
        color={color}
        light
      />
    );
  } else if (iconStyle === 'solid') {
    return (
      <FontAwesome5
        style={[styles.link, style]}
        size={size}
        name={name}
        color={color}
        solid
      />
    );
  } else if (iconStyle === 'brand') {
    return (
      <FontAwesome5
        style={[styles.link, style]}
        size={size}
        name={name}
        color={color}
        brand
      />
    );
  } else {
    return (
      <FontAwesome5
        style={[styles.link, style]}
        size={size}
        name={name}
        color={color}
      />
    );
  }
};

const styles = StyleSheet.create({
  link: {
    alignSelf: 'center',
  },
});

export type IconType =
  | typeof FontAwesomeIcon
  | typeof Bolt
  | typeof ChevronRight
  | typeof NavCloseIcon
  | typeof NavBackIcon
  | typeof NavAddIcon;
