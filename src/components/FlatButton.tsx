import React from 'react';
import {StyleSheet, TouchableOpacity, TextStyle} from 'react-native';

import {buttonBase} from '@style/index';

type IButton = {
  onPress: () => void;
  variant?: string;
  style?: TextStyle;
  disabled?;
};
export const FlatButton: React.FunctionComponent<IButton> = ({
  onPress,
  style,
  disabled,
  children,
}) => (
  <TouchableOpacity
    style={{...styles.button, ...style}}
    onPress={onPress}
    disabled={disabled}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    ...buttonBase,
  },
});
