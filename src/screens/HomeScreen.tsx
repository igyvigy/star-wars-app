import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/.';

import {useAppSelector} from '@utils/hooks';

import {boldFont, regularFont} from '@style/fonts';
import {knownUnknownNumber} from '@utils/.';
import Kind, {nameForKind} from '@models/Kind';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({navigation}: Props) => {
  const byId = useAppSelector(state => state.api.byId);
  const allByKind = useAppSelector(state => state.api.allByKind);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const KindsView = (): JSX.Element => {
    let views: JSX.Element[] = [];

    for (let kind of Object.values(Kind)) {
      views.push(
        <TouchableOpacity
          style={[backgroundStyle, styles.kindsContainer]}
          key={kind}
          onPress={() =>
            navigation.push('ListScreen', {
              kind,
              title: nameForKind(kind),
            })
          }>
          <View style={styles.row}>
            <Text style={{...boldFont}}>{nameForKind(kind)}</Text>
            <Text style={{...regularFont}}>
              {`${knownUnknownNumber(kind, byId, allByKind[kind]).known}`}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }

    return <>{views}</>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.container}>
        <View>
          <KindsView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kindsContainer: {padding: 16},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
