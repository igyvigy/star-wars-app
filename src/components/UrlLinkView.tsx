import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {KindById} from '@store/api/types';
import {
  extractKindFromModelUrl,
  extractIdFromModelUrl,
  nameForKind,
} from '@utils/.';
import Kind from '@models/Kind';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GrayText, Green} from '@style/colors';

type Props = {
  navigation;
  byId: KindById;
  data: string | {kind: Kind; id: number};
};

export const displayForModel = (
  data: string | {kind: Kind; id: number},
  byId: KindById,
): JSX.Element => {
  let kind = Kind.PEOPLE;
  let id = 1;

  if (typeof data === 'string') {
    kind = extractKindFromModelUrl(data);
    id = extractIdFromModelUrl(data);
  } else {
    kind = data.kind;
    id = data.id;
  }
  const m = byId[kind][id];
  if (m !== undefined) {
    return (
      <Text
        style={{
          color: Green,
        }}>
        {m._title ?? `${kind} ${id}`}
      </Text>
    );
  } else {
    return (
      <Text
        style={{
          color: GrayText,
        }}>{`new ${nameForKind(kind, false)} (tap to discover)`}</Text>
    );
  }
};

const UrlLinkView: React.FC<Props> = ({navigation, data, byId}) => {
  let kind = Kind.PEOPLE;
  let id = 1;
  if (typeof data === 'string') {
    kind = extractKindFromModelUrl(data);
    id = extractIdFromModelUrl(data);
  } else {
    kind = data.kind;
    id = data.id;
  }
  return (
    <TouchableOpacity
      key={`${kind} - ${id}`}
      style={styles.container}
      onPress={() => {
        navigation.push('DetailsScreen', {
          kind,
          id,
        });
      }}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{displayForModel(data, byId)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UrlLinkView;

const styles = StyleSheet.create({
  container: {padding: 8},
  button: {
    borderColor: GrayText,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
});
