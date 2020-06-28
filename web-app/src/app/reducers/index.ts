import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State as AuthState, reducer as AuthReducer } from './auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  auth: AuthState
}

export const selectAuth = (state: State) => state.auth;
export const selectUser = createSelector(selectAuth, (state: AuthState) => state.user);
export const selectUserRoom = createSelector(selectAuth, (state: AuthState) => state.room);

export const reducers: ActionReducerMap<State> = {
  auth: AuthReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
