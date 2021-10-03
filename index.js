/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'Require cycle:',
  'Animated.event now requires a second argument',
]);

AppRegistry.registerComponent(appName, () => App);
