import {
  ActionReducer,
  ActionReducerMap,

  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { reducer as AuthReducer, State as AuthState } from './auth.reducer';
import { reducer as RoomsReducer, State as RoomsState } from './room.reducer';

export interface State {
  auth: AuthState
  rooms: RoomsState
}

export const selectAuth = (state: State) => state.auth;
export const selectUser = createSelector(selectAuth, (state: AuthState) => state.user);
export const selectUserRoom = createSelector(selectAuth, (state: AuthState) => state.room);
export const selectRooms = (state: State) => state.rooms.rooms;

export const reducers: ActionReducerMap<State> = {
  auth: AuthReducer,
  rooms: RoomsReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth', 'rooms'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
