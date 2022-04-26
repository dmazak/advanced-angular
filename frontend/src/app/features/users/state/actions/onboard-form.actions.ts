import { createAction, props } from '@ngrx/store';
import { TemporaryFormState } from '../reducers/onboard-form.reducer';

const onboardForm = createAction(
  '[users] onboard form temp data',
  props<{ payload: TemporaryFormState }>()
);

const formSubmitted = createAction('[users] onboard form submitted');

export const OnboardFormEvents = {
  formSubmitted,
};

export const OnboardFormDocuments = {
  onboardForm,
};
