import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const featureName = 'featureIdentity';
export interface IdentityState {}

export const reducers: ActionReducerMap<IdentityState> = {};

const selectFeature = createFeatureSelector<IdentityState>(featureName);
