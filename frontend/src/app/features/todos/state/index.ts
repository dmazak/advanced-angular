import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromModels from '../models';
export const featureName = 'featureTodos';
export interface TodosState {}

export const reducers: ActionReducerMap<TodosState> = {};

// 1. Feature Selector
const selectFeature = createFeatureSelector<TodosState>(featureName);
// 2. Selector per "branch" of this feature

// 3. Any helpers (optional)

// 4. What the component needs (Models)

export const selectTodosViewModel = createSelector(
  selectFeature,
  (f) =>
    ({
      clearCompletedEnabled: true,
      dataLoaded: true,
      filterButtons: {
        completed: 1,
        incomplete: 2,
        total: 3,
        showing: 'all',
      },
      items: [
        { id: '1', description: 'Get Shoes for Henry', completed: false },
        { id: '2', description: 'Clean Garage', completed: false },
        { id: '99', description: 'Mow Lawn', completed: true },
      ],
    } as fromModels.TodosViewModel)
);
