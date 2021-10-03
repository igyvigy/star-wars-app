import {API_BASE_URL} from '@env';

import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Kind from '@models/Kind';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const DEBUG_PRINT = false;

export type ApiResponse = {
  count: number;
  next?: string;
  previous?: string;
  results: object[];
};

const defaultHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
};

export const getSWModels = async (
  kind: Kind,
): Promise<{
  objects: object[];
  previous: string | undefined;
  next: string | undefined;
}> => {
  return _baseGet<ApiResponse>({
    kind,
  }).then(response => {
    DEBUG_PRINT && console.debug('got', response.count, 'models');
    return {
      objects: response.results,
      previous: response.previous,
      next: response.next,
    };
  });
};

export const getSWModelBatch = async (
  kind: Kind,
  ids: number[],
): Promise<object[]> => {
  const tasks = ids.map(id =>
    _baseGet<object>({
      kind,
      id,
    }),
  );
  const results = await Promise.all(tasks);
  return results;
};

export const getSWModel = async (props: {
  kind: Kind;
  id: number;
}): Promise<object> => {
  const {kind, id} = props;
  return _baseGet<object>({
    kind,
    id,
  });
};

export const getSWModelsWithUrl = async (
  url: string,
): Promise<{
  objects: object[];
  previous: string | undefined;
  next: string | undefined;
}> => {
  return _baseGet<ApiResponse>({
    url,
  }).then(response => {
    DEBUG_PRINT && console.debug('got', response.count, 'models');
    return {
      objects: response.results,
      previous: response.previous,
      next: response.next,
    };
  });
};

const _baseGet = async <T>(params: {
  kind?: Kind;
  id?: number;
  url?: string;
}): Promise<T> => {
  const {kind, id, url} = params;

  let _url =
    id !== undefined
      ? `${API_BASE_URL}${kind}/${id}`
      : `${API_BASE_URL}${kind}`;

  if (url) {
    _url = url;
  }
  const config: AxiosRequestConfig | undefined = {
    headers: defaultHeaders(),
  };
  DEBUG_PRINT && console.debug('GET', _url, config);
  try {
    const response: AxiosResponse<T> = await axios.get(_url, config);
    DEBUG_PRINT && console.debug('response', Object.keys(response.data));
    return response.data;
  } catch (error) {
    DEBUG_PRINT && console.debug('error', error);
    return Promise.reject(error);
  }
};
