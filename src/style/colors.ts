import {Appearance} from 'react-native';

const scheme = Appearance.getColorScheme();

const isLight = scheme === 'light';

export const Red = '#FF0000';
export const White = isLight ? '#ffffff' : '#000000';
export const EverWhite = '#ffffff';
export const Black = isLight ? '#000000' : '#ffffff';
export const EverBlack = '#000000';
export const Green = '#40c950';
export const DarkGreen = isLight ? '#49a330' : '#E6FAE6';
export const LightGreen = isLight ? '#E6FAE6' : '#49a330';
export const LightGray = isLight ? '#e0e0e0' : '#262626';
export const Gray = '#848484';

export const DarkText = isLight ? '#333333' : '#e0e0e0';
export const GrayText = '#454545';

export const SegmentActiveColor = Green;
export const SegmentInactiveColor = DarkText;

type IPaletteProp = {
  light?: string;
  main?: string;
  dark?: string;
};
export type IPalette = {
  common: {
    black: string;
    white: string;
  };
  primary: IPaletteProp;
  secondary: IPaletteProp;
  success: IPaletteProp;
  warning: IPaletteProp;
  error: IPaletteProp;
  grey: {A100; N500};
};
export const Palette: IPalette = {
  common: {
    black: '#000000',
    white: '#ffffff',
  },
  primary: {
    light: '#7FB1CF',
    main: '#1074AF',
    dark: '#111436',
  },
  secondary: {
    light: '#A9B6C6',
    main: '#3E5A7A',
  },
  success: {
    main: '#57A773',
  },
  warning: {
    main: '#F19A3E',
  },
  error: {
    main: '#E54B4B',
    dark: '#B31919',
  },
  grey: {
    A100: '#F1F3F9',
    N500: '#878E97',
  },
};
