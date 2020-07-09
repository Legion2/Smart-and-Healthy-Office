import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './auth.actions';

export interface State {
  isLoggedIn: boolean
  user: string | null
  room: string | null
}
export const initialState: State = {
  isLoggedIn: false,
  user: null,
  room: null
};

const authReducer = createReducer(
  initialState,
  on(Actions.login, (state, action) => ({ ...state, isLoggedIn: true, user: action.user, room: action.room })),
  on(Actions.logout, state => ({ ...state, isLoggedIn: false, user: null, room: null }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
