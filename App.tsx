import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import Root from '@navigation/.';
import {store} from '@store/.';

const App: () => JSX.Element = () => {
  return (
    <Provider store={store}>
      <NavigationContainer fallback={<Text>Loading...</Text>}>
        <Root />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
