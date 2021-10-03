module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@style': './src/style',
          '@utils': './src/utils',
          '@models': './src/models',
          '@config': './src/config',
          '@assets': './assets',
          '@screens': './src/screens',
          '@views': './src/views',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: false,
      },
    ],
  ],
};
