import {TextStyle} from 'react-native';

import {Palette} from '@style/index';

export const inputBase: TextStyle = {
  width: '100%',
  paddingHorizontal: 16,
  paddingVertical: 14,
  borderWidth: 1,
  borderColor: Palette.primary.main,
  borderStyle: 'solid',
  borderRadius: 6,
  color: Palette.primary.main,
};
