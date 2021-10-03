import React from 'react';
import {Image, StyleSheet, View, TextStyle, Text} from 'react-native';

import {IFontSize, Palette} from '@style/index';
import Kind from '@models/Kind';
import {imageForKind} from '@utils/.';

type IProps = {
  name: string;
  kind: Kind;
  size?: 40 | 48 | 70;
  style?: TextStyle;
  textColor?: string;
  textSize?: IFontSize;
};
export const Avatar: React.FunctionComponent<IProps> = ({
  name,
  kind,
  size = 64,
  style,
  textColor = Palette.common.white,
  textSize = 18,
}) => {
  const nameInitials: string = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={{width: size, height: size, ...styles.container, ...style}}>
      <Image
        style={{width: size, height: size, ...styles.image}}
        source={imageForKind(kind)}
      />
      <Text style={{fontSize: textSize, color: textColor}}>{nameInitials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.grey.N500,
    color: Palette.primary.main,
  },
  image: {
    borderRadius: 16,
    position: 'absolute',
  },
});
