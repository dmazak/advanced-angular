import { createReducer, on } from '@ngrx/store';
import {
  OnboardFormDocuments,
  OnboardFormEvents,
} from '../actions/onboard-form.actions';
export interface TemporaryFormState {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password1?: string;
  password2?: string;
}

const initialState: TemporaryFormState = {};

export const reducer = createReducer(
  initialState,
  on(OnboardFormEvents.formSubmitted, () => initialState),
  on(OnboardFormDocuments.onboardForm, (_, a) => a.payload ?? initialState)
);
