import {addOrUpdateArr, addOrUpdateObj} from '@utils/.';
import {
  initialState,
  ApiState,
  SET_SW_MODELS,
  SET_ALL_MODELS_BY_KIND,
  SET_SELECTED_MODEL,
  SET_ALL_SW_MODELS_FOR_KIND,
  ApiActionTypes,
  SET_SW_MODEL_FOR_KIND,
  ADD_SW_MODELS_FOR_KIND,
  SET_NEXT_URL,
  SET_FETCHING,
  API_RESET_STORE,
} from './types';

export default function apiReducer(
  state = initialState,
  action: ApiActionTypes,
): ApiState {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_SW_MODELS:
      return {
        ...state,
        byId: action.payload,
      };

    case SET_ALL_MODELS_BY_KIND:
      return {
        ...state,
        allByKind: action.payload,
      };

    case SET_SELECTED_MODEL:
      return {
        ...state,
        selected: action.payload,
      };
    case ADD_SW_MODELS_FOR_KIND:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.kind]: addOrUpdateObj(
            state.byId[action.payload.kind],
            action.payload.models,
          ),
        },
        allByKind: {
          ...state.allByKind,
          [action.payload.kind]: addOrUpdateArr(
            state.allByKind[action.payload.kind],
            action.payload.models.map(m => m.id ?? 1),
            num => action.payload.models.map(m => m.id ?? 1).includes(num),
          ),
        },
      };
    case SET_ALL_SW_MODELS_FOR_KIND:
      return {
        ...state,
        byId: {...state.byId, [action.payload.kind]: action.payload.models},
        allByKind: {
          ...state.allByKind,
          [action.payload.kind]: addOrUpdateArr(
            state.allByKind[action.payload.kind],
            Object.keys(action.payload.models).map(s => Number(s)),
            num =>
              Object.keys(action.payload.models)
                .map(s => Number(s))
                .includes(num),
          ),
        },
      };
    case SET_SW_MODEL_FOR_KIND:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.kind]: {
            ...state.byId[action.payload.kind],
            [action.payload.model.id ?? 0]: action.payload.model,
          },
        },
        allByKind: {
          ...state.allByKind,
          [action.payload.kind]: addOrUpdateArr(
            state.allByKind[action.payload.kind],
            action.payload.model.id,
            id => id === action.payload.model.id,
          ),
        },
      };
    case SET_NEXT_URL:
      return {
        ...state,
        next: action.payload,
      };
    case API_RESET_STORE:
      return initialState;
    default:
      return state;
  }
}
