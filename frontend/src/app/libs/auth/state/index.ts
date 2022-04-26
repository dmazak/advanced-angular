import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';

export const featureName = 'featureIdentity';
export interface IdentityState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<IdentityState> = {
  auth: fromAuth.reducer,
};

const selectFeature = createFeatureSelector<IdentityState>(featureName);

const selectAuthBranch = createSelector(selectFeature, (f) => f.auth);

export const selectUser = createSelector(selectAuthBranch, fromAuth.selectUser);

export const selectUserLoggedIn = createSelector(
  selectAuthBranch,
  fromAuth.selectUserLoggedIn
);
