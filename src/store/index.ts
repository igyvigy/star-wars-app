import {configureStore} from '@reduxjs/toolkit';

import {combineReducers} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {logger} from './middlewares/logger';
import apiReducer from './api/reducers';
import {ApiActionTypes} from './api/types';

type StoreActions = ApiActionTypes;

const rootReducer = combineReducers({
  api: apiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});
export type AppDispatchResult<R> = ThunkAction<
  R,
  RootState,
  null,
  StoreActions
>;

export type AppDispatch = ThunkDispatch<RootState, null, StoreActions>;
