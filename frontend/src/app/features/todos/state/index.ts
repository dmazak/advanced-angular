import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromModels from '../models';
import * as fromItems from './reducers/items.reducer';
export const featureName = 'featureTodos';
export interface TodosState {
  items: fromItems.ItemsState;
}

export const reducers: ActionReducerMap<TodosState> = {
  items: fromItems.reducer,
};

// 1. Feature Selector
const selectFeature = createFeatureSelector<TodosState>(featureName);
// 2. Selector per "branch" of this feature
const selectItemsBranch = createSelector(selectFeature, (f) => f.items);
// 3. Any helpers (optional)

const selectTodoItemEntities = createSelector(
  selectItemsBranch,
  fromItems.selectAllTodoItemEtities
);

const selectNumberOfTodoItems = createSelector(
  selectItemsBranch,
  fromItems.selectTotalNumberOfTodoItems
);

const selectTodoItemViewModels = createSelector(
  selectTodoItemEntities,
  (items) => items as fromModels.TodoItemViewModel[]
);
// 4. What the component needs (Models)

export const selectTodosViewModel = createSelector(
  selectTodoItemViewModels,
  (items) =>
    ({
      clearCompletedEnabled: true,
      dataLoaded: true,
      filterButtons: {
        completed: 1,
        incomplete: 2,
        total: 3,
        showing: 'all',
      },
      items,
    } as fromModels.TodosViewModel)
);
