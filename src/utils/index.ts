import SWModel from '@models/SWModel';
import Kind from '@models/Kind';
import {KindById, ModelById} from '@store/api/types';

export const extractIdFromModel = (m: SWModel): number => {
  let id = 9007;
  let url = m.url;
  if (url) {
    if (url.charAt(url.length - 1) === '/') {
      url = url.substring(0, url.length - 1);
    }
    id = Number(url.substring(url.lastIndexOf('/') + 1));
  }
  return id;
};

export const extractIdFromModelUrl = (url: string): number => {
  let _url = url;
  if (_url.charAt(_url.length - 1) === '/') {
    _url = _url.substring(0, _url.length - 1);
  }
  const parts = _url.split('/');
  const id = parts[parts.length - 1];
  return Number(id);
};

export const addOrUpdateArr = <T>(
  arr: T[],
  item: T | T[],
  search: (m: T) => boolean,
): T[] => {
  const inverted = (m: T) => {
    return !search(m);
  };
  if (Array.isArray(item)) {
    return [...arr.filter(inverted), ...item];
  } else {
    return [...arr.filter(inverted), item];
  }
};

export const addOrUpdateObj = <T extends SWModel>(
  obj: ModelById,
  item: T | T[],
): ModelById => {
  if (Array.isArray(item)) {
    let slice = {...obj};
    for (let i of item) {
      if (!i.id || !i.kind) {
        continue;
      }
      slice[i.id] = i;
    }
    return slice;
  } else {
    let slice = {...obj};
    if (!item.id || !item.kind) {
      return slice;
    }
    slice[item.id] = item;
    return slice;
  }
};

export const maybeUrlsFromArray = <T extends SWModel>(arr?: T[]): string[] => {
  return (arr ?? []).filter(f => f.url !== undefined).map(f => f.url ?? '');
};

export const knownUnknownNumber = (
  kind: Kind,
  byId: KindById,
  ids: number[],
): {known: number; unknown: number} => {
  let known = 0;
  let unknown = 0;

  ids.forEach(id => {
    const existing = byId[kind][id];
    if (existing) {
      known += 1;
    } else {
      unknown += 1;
    }
  });

  return {
    known,
    unknown,
  };
};
