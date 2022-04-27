import { createAction, props } from '@ngrx/store';
import { TemporaryFormState } from '../reducers/onboard-form.reducer';

const onboardForm = createAction(
  '[users] onboard form temp data',
  props<{ payload: TemporaryFormState | null }>()
);

const formSubmitted = createAction('[users] onboard form submitted');

const accountCreationRequested = createAction(
  '[users] account creation requested'
);

const accountCreatedSuccessfully = createAction(
  '[users] account created successfully'
);
export const OnboardFormEvents = {
  formSubmitted,
  accountCreationRequested,
  accountCreatedSuccessfully,
};

export const OnboardFormDocuments = {
  onboardForm,
};
