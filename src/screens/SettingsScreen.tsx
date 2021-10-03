import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';

import {RootStackParamList} from '@navigation/.';
import {useAppSelector} from '@utils/hooks';
import {RootState, AppDispatch} from '@store/.';
import Spinner from '@components/Spinner';

import {Strings} from '@style/strings';
import {boldFont} from '@style/fonts';
import {resetAll} from '@store/api/actions';

const mapStateToProps = (state: RootState) => ({
  isFetching: state.api.isFetching,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    resetAll: () => dispatch(resetAll()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'> &
  PropsFromRedux;

const SettingsScreen: React.FC<Props> = ({resetAll}: Props) => {
  const isFetching = useAppSelector(state => state.api.isFetching);

  const Row = ({
    text,
    onPress,
  }: {
    text: string;
    onPress: () => void;
  }): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        key={text}
        onPress={onPress}>
        <View style={styles.row}>
          <Text style={{...boldFont}}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['right', 'left']} style={styles.container}>
      {isFetching && <Spinner loading={isFetching} />}
      {!isFetching && (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollContainer}>
          <Row
            text={Strings.reset}
            onPress={() => {
              resetAll();
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default connector(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {},
  rowContainer: {padding: 16},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
