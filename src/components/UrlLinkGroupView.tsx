import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {KindById} from '@store/api/types';
import {
  extractKindFromModelUrl,
  extractIdFromModelUrl,
  nameForKind,
  knownUnknownNumber,
} from '@utils/.';
import Kind from '@models/Kind';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GrayText, Green} from '@style/colors';
import Link from '@models/Link';
import UrlLinkView from './UrlLinkView';
import {boldFont} from '@style/fonts';

type Props = {
  navigation;
  link: Link;
  byId: KindById;
  modelTitle?: string;
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

const UrlLinkGroupView: React.FC<Props> = ({
  navigation,
  link,
  byId,
  modelTitle,
}) => {
  const knownUnknown = knownUnknownNumber(
    link.type,
    byId,
    link.values.map(url => extractIdFromModelUrl(url)),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const kind = link.type;
          const urls = link.values;
          navigation.push('ListScreen', {
            kind,
            urls,
            title: modelTitle ? `${link.title} of ${modelTitle}` : link.title,
          });
        }}>
        <View>
          <View style={styles.header}>
            <Text style={{...boldFont, ...styles.text}}>{link.title}</Text>
            {knownUnknown.unknown > 0 && (
              <Text style={styles.subText}>{'tap to discover'}</Text>
            )}
          </View>
          {link.values.map(url => {
            return (
              <UrlLinkView navigation={navigation} data={url} byId={byId} />
            );
          })}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UrlLinkGroupView;

const styles = StyleSheet.create({
  container: {padding: 8},
  button: {
    borderColor: GrayText,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
  },
  text: {
    fontSize: 18,
  },
  subText: {
    marginStart: 16,
    color: GrayText,
    textAlignVertical: 'bottom',
  },
  header: {
    flexDirection: 'row',
  },
});
