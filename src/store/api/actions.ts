import {ActionCreator} from 'redux';
import {extractIdFromModel} from '@utils/.';
import {AppDispatchResult} from '..';

import Kind from '@models/Kind';
import SWModel from '@models/SWModel';
import {
  ApiActionTypes,
  ModelById,
  SET_FETCHING,
  SET_SW_MODEL_FOR_KIND,
  SET_ALL_SW_MODELS_FOR_KIND,
  ADD_SW_MODELS_FOR_KIND,
  SET_NEXT_URL,
  API_RESET_STORE,
} from './types';

export function setNextUrlForKind(props: {
  kind: Kind;
  url?: string;
}): AppDispatchResult<void> {
  return (dispatch, getState): ApiActionTypes => {
    const {kind, url} = props;
    const next = getState().api.next;
    next[kind] = url;
    return dispatch({
      type: SET_NEXT_URL,
      payload: next,
    });
  };
}

export function setAllApiModelsForKind<T extends SWModel>(props: {
  kind: Kind;
  models: T[];
}): ApiActionTypes {
  let byid: ModelById = {};
  props.models.forEach(m => {
    byid[extractIdFromModel(m)] = m;
  });
  return {
    type: SET_ALL_SW_MODELS_FOR_KIND,
    payload: {
      kind: props.kind,
      models: byid,
    },
  };
}

export function setApiModelsForKind<T extends SWModel>(props: {
  kind: Kind;
  ids: number[];
  models: T[];
}): ApiActionTypes {
  let byid: ModelById = {};
  props.models.forEach(m => {
    byid[extractIdFromModel(m)] = m;
  });
  return {
    type: ADD_SW_MODELS_FOR_KIND,
    payload: {
      kind: props.kind,
      ids: props.ids,
      models: props.models,
    },
  };
}

export function setApiModelForKind<T extends SWModel>(props: {
  kind: Kind;
  model: T;
}): AppDispatchResult<void> {
  return (dispatch, _): ApiActionTypes => {
    return dispatch({
      type: SET_SW_MODEL_FOR_KIND,
      payload: {
        kind: props.kind,
        model: props.model,
      },
    });
  };
}

export const setApiFetching: ActionCreator<ApiActionTypes> = (
  isFetching: boolean,
) => {
  return {type: SET_FETCHING, payload: isFetching};
};

export const setApiFetchingIfNotSet = (
  isFetching: boolean,
): AppDispatchResult<void> => {
  return (dispatch): ApiActionTypes => {
    return dispatch({
      type: SET_FETCHING,
      payload: isFetching,
    });
  };
};

export const resetAll = (): AppDispatchResult<void> => {
  return (dispatch): ApiActionTypes => {
    return dispatch({
      type: API_RESET_STORE,
    });
  };
};
