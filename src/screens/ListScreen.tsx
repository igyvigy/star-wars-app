import React, {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, ConnectedProps} from 'react-redux';
import {useTheme} from '@react-navigation/native';

import {RootStackParamList} from '@navigation/.';
import {extractIdFromModelUrl} from '@utils/.';
import {getAll, fetchMultiple, getNext} from '@store/slice';
import {AppDispatch, RootState} from '@store/.';
import Spinner from '@components/Spinner';
import Kind, {nameForKind} from '@models/Kind';
import SWModel from '@models/SWModel';
import {boldFont} from '@style/fonts';
import {Strings} from '@style/strings';
import {FlatButton} from '@components/FlatButton';

const mapStateToProps = (state: RootState) => ({
  allIds: (kind: Kind) => state.api.allByKind[kind],
  all: (kind: Kind) =>
    state.api.allByKind[kind].map(id => state.api.byId[kind][id]),
  selected: (kind: Kind, ids: number[]) =>
    ids.map(id => state.api.byId[kind][id]),
  isFetching: state.api.isFetching,
  haseNext: (kind: Kind) => state.api.next[kind],
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getAll: (kind: Kind) => dispatch(getAll(kind)),
    fetchMultiple: (kind: Kind, ids: number[]) =>
      dispatch(fetchMultiple(kind, ids)),
    getNext: (kind: Kind, url: string) => dispatch(getNext(kind, url)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = NativeStackScreenProps<RootStackParamList, 'ListScreen'> &
  PropsFromRedux;

const ListScreen: React.FC<Props> = props => {
  const {
    navigation,
    route,
    isFetching,
    all,
    selected,
    haseNext,
    getAll,
    fetchMultiple,
    getNext,
  } = props;

  const kind =
    route.params['kind'] !== undefined ? route.params['kind'] : Kind.PEOPLE;

  let urls: string[] = useMemo(() => {
    return route.params['urls'] !== undefined ? route.params['urls'] : [];
  }, [route.params]);

  const title =
    route.params['title'] !== undefined
      ? route.params['title']
      : nameForKind(kind);
  let data: SWModel[] =
    urls.length === 0
      ? all(kind).sort((a, b) => (a.id ?? 1) - (b.id ?? 1))
      : selected(
          kind,
          urls.map(url => extractIdFromModelUrl(url)),
        ).sort((a, b) => (a.id ?? 1) - (b.id ?? 1));
  const needsFetch =
    urls.length > 0 ||
    data.length <= 0 ||
    data.filter(d => (d !== undefined ? d.needsFetch : true)).length > 0;

  const hasNext = !!haseNext(kind) && urls.length <= 0;

  const theme = useTheme();

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({
        title,
        headerRight: () => (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              navigation.popToTop();
            }}>
            <Text style={[styles.navTitle, {color: theme.colors.primary}]}>
              {Strings.home}
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, theme.colors.primary, title]);

  const reload = useCallback(() => {
    const ids: number[] =
      urls.length > 0 ? urls.map(url => extractIdFromModelUrl(url)) : [];
    if (kind && ids.length > 0) {
      fetchMultiple(kind, ids);
    } else if (kind && urls.length === 0) {
      getAll(kind);
    }
  }, [fetchMultiple, getAll, kind, urls]);

  useEffect(() => {
    needsFetch && reload();
  }, [needsFetch, reload]);

  return (
    <SafeAreaView edges={['right', 'left']} style={styles.container}>
      {isFetching && <Spinner loading={isFetching} />}
      {!isFetching && (
        <View style={styles.container}>
          <FlatList
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => getAll(kind)}
              />
            }
            data={data}
            keyExtractor={(item, index) => `${item?.kind}-${item?.id}-${index}`}
            contentContainerStyle={styles.scrollContainer}
            renderItem={item => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  if (item.item.kind && item.item.id) {
                    navigation.push('DetailsScreen', {
                      kind: item.item.kind,
                      id: item.item.id,
                    });
                  }
                }}>
                <View>
                  <Text style={{...boldFont}}>{item.item?._title ?? ''}</Text>
                  <Text>{item.item?._subtitle ?? ''}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {hasNext && (
            <View style={styles.footer}>
              <FlatButton
                onPress={() => {
                  const url = haseNext(kind);
                  url && getNext(kind, url);
                }}>
                <Text style={{color: theme.colors.primary}}>
                  {Strings.loadMore}
                </Text>
              </FlatButton>
            </View>
          )}
          {!hasNext && (
            <View style={styles.footer}>
              <FlatButton
                onPress={() => {
                  reload();
                }}>
                <Text style={{color: theme.colors.primary}}>
                  {Strings.reload}
                </Text>
              </FlatButton>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default connector(ListScreen);

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContainer: {
    padding: 16,
  },
  navButton: {
    width: 50,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  navTitle: {fontSize: 16},
  listItem: {
    marginBottom: 8,
  },
  footer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
