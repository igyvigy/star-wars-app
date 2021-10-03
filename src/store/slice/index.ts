import {
  getSWModels,
  getSWModel,
  getSWModelBatch,
  getSWModelsWithUrl,
} from 'src/api';
import {RootState, AppDispatchResult} from '..';
import {
  setApiFetching,
  setApiModelsForKind,
  setApiModelForKind,
  setNextUrlForKind,
} from '@store/api/actions';
import Kind from '@models/Kind';
import Film from '@models/Film';
import Planet from '@models/Planet';
import Species from '@models/Species';
import Starship from '@models/Starship';
import Vehicle from '@models/Vehicle';
import Person from '@models/Person';

export type AnyModel = Film | Person | Planet | Species | Starship | Vehicle;

export const make = (
  getState: () => RootState,
  json: object,
  kind: Kind,
): AnyModel => {
  switch (kind) {
    case Kind.FILMS:
      return new Film({
        data: json,
        byId: (kind, id) => getState().api.byId[kind][id],
      });
    case Kind.PEOPLE:
      return new Person({
        data: json,
        byId: (kind, id) => getState().api.byId[kind][id],
      });
    case Kind.PLANETS:
      return new Planet({
        data: json,
        byId: (kind, id) => getState().api.byId[kind][id],
      });
    case Kind.SPECIES:
      return new Species({
        data: json,
        byId: (kind, id) => getState().api.byId[kind][id],
      });
    case Kind.STARSHIPS:
      return new Starship({
        data: json,
        byId: (kind, id) => getState().api.byId[kind][id],
      });
    case Kind.VEHICLES:
      return new Vehicle({
        data: json,
        byId: (kind, id) => getState().api.byId[kind][id],
      });
  }
};

export function getNext(
  kind: Kind,
  url: string,
): AppDispatchResult<Promise<AnyModel[]>> {
  return async (dispatch, getState) => {
    dispatch(setApiFetching(true));
    const result = await getSWModelsWithUrl(url);
    const {objects, next} = result;
    const models = objects.map(json => make(getState, json, kind));
    dispatch(
      setApiModelsForKind({kind, ids: models.map(m => m.id ?? 1), models}),
    );
    dispatch(setNextUrlForKind({kind, url: next}));
    dispatch(setApiFetching(false));
    return models;
  };
}

export function getAll(kind: Kind): AppDispatchResult<Promise<AnyModel[]>> {
  return async (dispatch, getState) => {
    dispatch(setApiFetching(true));
    const result = await getSWModels(kind);
    const {objects, next} = result;
    const models = objects.map(json => make(getState, json, kind));
    dispatch(
      setApiModelsForKind({kind, ids: models.map(m => m.id ?? 1), models}),
    );
    dispatch(setNextUrlForKind({kind, url: next}));
    dispatch(setApiFetching(false));
    return models;
  };
}

export function fetchMultiple(
  kind: Kind,
  ids: number[],
): AppDispatchResult<Promise<AnyModel[]>> {
  return async (dispatch, getState) => {
    dispatch(setApiFetching(true));
    const linked: AnyModel[] = [];
    const idsToFetch: number[] = [];
    for (let id of ids) {
      const existingModel = getState().api.byId[kind][id];
      if (existingModel) {
        linked.push(existingModel);
      } else {
        idsToFetch.push(id);
      }
    }
    const objects = await getSWModelBatch(kind, idsToFetch);
    const fetchedModels = objects.map(json => make(getState, json, kind));
    const models = [...linked, ...fetchedModels];
    dispatch(setApiModelsForKind({kind, ids, models: fetchedModels}));
    dispatch(setApiFetching(false));
    return models;
  };
}

export function getOne(
  kind: Kind,
  id: number,
): AppDispatchResult<Promise<AnyModel>> {
  return async (dispatch, getState) => {
    dispatch(setApiFetching(true));
    const modelJson = await getSWModel({kind, id});
    const model = make(getState, modelJson, kind);
    dispatch(setApiModelForKind({kind, model}));
    dispatch(setApiFetching(false));
    return model;
  };
}
