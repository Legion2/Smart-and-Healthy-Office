import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'auth-login',
  props<{ user: string }>()
);

export const logout = createAction(
  'auth-logout'
);
