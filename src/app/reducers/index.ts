import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { toggleThemeReducer } from '../shared/store/store.reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  toggleThemeReducer: toggleThemeReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
