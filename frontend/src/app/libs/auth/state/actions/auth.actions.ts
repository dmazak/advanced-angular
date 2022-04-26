import { createAction, props } from '@ngrx/store';
import { UserState } from '../reducers/auth.reducer';

const loginRequested = createAction('[auth] login requested');
const logoutRequested = createAction('[auth] logout requested');
const user = createAction(
  '[auth] user logged in',
  props<{ payload: UserState | null }>()
);

export const AuthEvents = {
  loginRequested,
  logoutRequested,
};

export const AuthDocuments = {
  user,
};
