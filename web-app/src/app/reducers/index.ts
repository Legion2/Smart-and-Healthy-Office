import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State as AuthState, reducer as AuthReducer } from './auth.reducer';

export interface State {
  auth: AuthState
}

export const selectAuth = (state: State) => state.auth;
export const selectUser = createSelector(selectAuth, (state: AuthState) => state.user);

export const reducers: ActionReducerMap<State> = {
  auth: AuthReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
