import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromOnBoardForm from './reducers/onboard-form.reducer';
export const featureName = 'featureUsers';

export interface UsersState {
  onBoardForm: fromOnBoardForm.TemporaryFormState;
}

export const reducers: ActionReducerMap<UsersState> = {
  onBoardForm: fromOnBoardForm.reducer,
};

const selectFeature = createFeatureSelector<UsersState>(featureName);
const selectOnBoardFormBranch = createSelector(
  selectFeature,
  (f) => f.onBoardForm
);

export const selectOnBoardFormData = createSelector(
  selectOnBoardFormBranch,
  (b) => b
);

export const selectOnBoardUserForPost = createSelector(
  selectOnBoardFormData,
  (user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    password: user.password1,
  })
);
