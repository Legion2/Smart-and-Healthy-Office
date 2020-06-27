import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './auth.actions';

export interface State {
  isLoggedIn: boolean
  user: string | null
}
export const initialState: State = {
  isLoggedIn: false,
  user: null,
};

const scoreboardReducer = createReducer(
  initialState,
  on(Actions.login, (state, action) => ({ ...state, isLoggedIn: true, user: action.user })),
  on(Actions.logout, state => ({ ...state, isLoggedIn: false, user: null }))
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
