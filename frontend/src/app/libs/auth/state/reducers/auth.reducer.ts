import { createReducer, on } from '@ngrx/store';
import { AuthDocuments } from '../actions/auth.actions';
export interface AuthState {
  user: UserState | null;
}

export interface UserState {
  sub: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

const initialState: AuthState = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthDocuments.userLoggedIn, (_, a) => ({
    user: a.payload,
  }))
);

export const selectUser = (state: AuthState) => state.user;

export const selectUserLoggedIn = (state: AuthState) => state.user !== null;
