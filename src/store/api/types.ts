import Kind from '@models/Kind';
import SWModel from '@models/SWModel';

export const SET_SW_MODELS = 'SET_SW_MODELS';
export const SET_ALL_MODELS_BY_KIND = 'SET_ALL_MODELS_BY_KIND';
export const SET_SELECTED_MODEL = 'SET_SELECTED_MODEL';
export const SET_NEXT_URL = 'SET_NEXT_URL';
export const SET_ALL_SW_MODELS_FOR_KIND = 'SET_ALL_SW_MODELS_FOR_KIND';
export const ADD_SW_MODELS_FOR_KIND = 'ADD_SW_MODELS_FOR_KIND';
export const SET_SW_MODEL_FOR_KIND = 'SET_SW_MODEL_FOR_KIND';

export const SET_FETCHING = 'SET_FETCHING';
export const API_RESET_STORE = 'API_RESET_STORE';

export type KindById = {[key in Kind]: ModelById};
export type ModelById = {[id: number]: SWModel};
export type SelectedModelByKind = {[key in Kind]: SWModel | undefined};
export type NextUrlByKind = {[key in Kind]: string | undefined};

export interface ApiState {
  byId: KindById;
  allByKind: {[key in Kind]: number[]};
  selected: SelectedModelByKind;
  next: NextUrlByKind;
  isFetching: boolean;
}

const makeAll = value => {
  return {
    films: value,
    people: value,
    planets: value,
    starships: value,
    vehicles: value,
    species: value,
  };
};

export const initialState: ApiState = {
  byId: makeAll({}),
  allByKind: makeAll([]),
  selected: makeAll(undefined),
  next: makeAll(undefined),
  isFetching: false,
};

export interface SetSWModelsAction {
  type: typeof SET_SW_MODELS;
  payload: KindById;
}

export interface SetAllByModelsByKindAction {
  type: typeof SET_ALL_MODELS_BY_KIND;
  payload: {[key in Kind]: number[]};
}

export interface SetSelectedModelForKindAction {
  type: typeof SET_SELECTED_MODEL;
  payload: SelectedModelByKind;
}

export interface SetNextUrlForKindAction {
  type: typeof SET_NEXT_URL;
  payload: NextUrlByKind;
}

export interface SetAllSWModelsForKindAction {
  type: typeof SET_ALL_SW_MODELS_FOR_KIND;
  payload: {kind: Kind; models: ModelById};
}

export interface AddSWModelsForKindAction {
  type: typeof ADD_SW_MODELS_FOR_KIND;
  payload: {kind: Kind; ids: number[]; models: SWModel[]};
}

export interface SetSWModelForKindAction {
  type: typeof SET_SW_MODEL_FOR_KIND;
  payload: {kind: Kind; model: SWModel};
}

export interface SetFetchingAction {
  type: typeof SET_FETCHING;
  payload: boolean;
}

export interface ResetStoreAction {
  type: typeof API_RESET_STORE;
}

export type ApiActionTypes =
  | SetSWModelsAction
  | SetAllByModelsByKindAction
  | SetSelectedModelForKindAction
  | SetNextUrlForKindAction
  | SetFetchingAction
  | SetAllSWModelsForKindAction
  | AddSWModelsForKindAction
  | ResetStoreAction
  | SetSWModelForKindAction;
