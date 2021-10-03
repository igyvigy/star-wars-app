import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  loading: boolean;
};

const Spinner: React.FC<Props> = ({loading}) => {
  return loading ? (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splash/spinner.json')}
        autoPlay
      />
    </View>
  ) : (
    <></>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
