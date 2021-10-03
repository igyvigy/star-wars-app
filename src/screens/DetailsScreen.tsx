import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {RootStackParamList} from '@navigation/.';
import {RootState, AppDispatch} from '@store/.';
import {getOne} from '@store/slice';
import UrlLinkView from '@components/UrlLinkView';

import Kind from '@models/Kind';
import {boldFont} from '@style/fonts';
import {Strings} from '@style/strings';
import UrlLinkGroupView from '@components/UrlLinkGroupView';
import Spinner from '@components/Spinner';
import {useTheme} from '@react-navigation/native';
import {Avatar} from '@components/Avatar';

const mapStateToProps = (state: RootState) => ({
  byId: state.api.byId,
  isFetching: state.api.isFetching,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    fetchModel: (kind: Kind, id: number) => dispatch(getOne(kind, id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'> &
  PropsFromRedux;

const DetailsScreen: React.FC<Props> = props => {
  const {navigation, route, byId, fetchModel} = props;

  const kind: Kind =
    route.params['kind'] !== undefined ? route.params['kind'] : undefined;

  let id: number =
    route.params['id'] !== undefined ? route.params['id'] : undefined;

  const needsFetch = byId[kind][id] === undefined;

  const theme = useTheme();

  useLayoutEffect(() => {
    if (kind && id && byId) {
      navigation.setOptions({
        title: byId[kind][id]?._title,
        headerRight: () => (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              navigation.popToTop();
            }}>
            <Text style={[{color: theme.colors.primary}, styles.navTitle]}>
              {Strings.home}
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [kind, id, byId, navigation, theme.colors.primary]);

  useEffect(() => {
    needsFetch && fetchModel(kind, id);
  }, [fetchModel, id, kind, needsFetch]);

  if (!kind || !id || !byId) {
    return <></>;
  }

  const model = byId[kind][id];

  const isFetching = model === undefined;

  const links = (model?._links ?? []).filter(l => l.values.length > 0);

  const ModelBody = (): JSX.Element => {
    if (!model) {
      return <></>;
    }
    return (
      <View style={styles.bodyContainer}>
        {Object.keys(model._body).map(key => {
          const value = model._body[key];
          let valueText = <Text style={styles.valueText}>{`${value}`}</Text>;
          if (typeof value === 'object' && value['url']) {
            valueText = (
              <UrlLinkView
                navigation={navigation}
                data={value.url}
                byId={byId}
              />
            );
          }
          return (
            <View style={styles.row}>
              <Text>{key}</Text>
              {valueText}
            </View>
          );
        })}
      </View>
    );
  };

  const LinksBody = (): JSX.Element => {
    if (links.length === 0) {
      return <></>;
    }
    return (
      <View style={styles.linksContainer}>
        {links.map(link => {
          return (
            <UrlLinkGroupView
              navigation={navigation}
              link={link}
              byId={byId}
              modelTitle={model?._title}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['right', 'left']} style={styles.container}>
      {isFetching && <Spinner loading={isFetching} />}
      {!isFetching && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}>
          <Avatar
            style={styles.avatar}
            name={model?._title ?? ''}
            kind={kind}
          />
          <ModelBody />
          <LinksBody />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default connector(DetailsScreen);

const styles = StyleSheet.create({
  container: {flex: 1},
  avatar: {position: 'absolute', top: 20, right: 20},
  navButton: {
    width: 50,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  navTitle: {fontSize: 16},
  scrollContainer: {
    margin: 8,
    paddingBottom: 44,
  },
  bodyContainer: {
    padding: 8,
  },
  linksContainer: {
    padding: 0,
  },
  row: {flexDirection: 'row'},
  valueText: {
    ...boldFont,
    paddingStart: 4,
    paddingBottom: 4,
  },
  listItem: {
    marginBottom: 8,
  },
});
