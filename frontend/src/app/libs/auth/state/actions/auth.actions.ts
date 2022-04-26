import { createAction, props } from '@ngrx/store';
import { UserState } from '../reducers/auth.reducer';

const loginRequested = createAction('[auth] login requested');

const userLoggedIn = createAction(
  '[auth] user logged in',
  props<{ payload: UserState }>()
);

export const AuthEvents = {
  loginRequested,
};

export const AuthDocuments = {
  userLoggedIn,
};
