import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromModels from '../models';
import * as fromItemsFilter from './reducers/items-filter.reducer';
import * as fromItems from './reducers/items.reducer';
export const featureName = 'featureTodos';
export interface TodosState {
  items: fromItems.ItemsState;
  itemsFilter: fromItemsFilter.ItemsFilterState;
}

export const reducers: ActionReducerMap<TodosState> = {
  items: fromItems.reducer,
  itemsFilter: fromItemsFilter.reducer,
};

// 1. Feature Selector
const selectFeature = createFeatureSelector<TodosState>(featureName);
// 2. Selector per "branch" of this feature
const selectItemsBranch = createSelector(selectFeature, (f) => f.items);
const selectItemsFilterBranch = createSelector(
  selectFeature,
  (f) => f.itemsFilter
);
// 3. Any helpers (optional)

const selectFilteringItemsBy = createSelector(
  selectItemsFilterBranch,
  (b) => b.filteringBy
);
const selectTodoItemEntities = createSelector(
  selectItemsBranch,
  fromItems.selectAllTodoItemEntities
);

const selectNumberOfTodoItems = createSelector(
  selectItemsBranch,
  fromItems.selectTotalNumberOfTodoItems
);
const selectTodoItemDictionary = createSelector(
  selectItemsBranch,
  fromItems.selectTodoItemDictionary
);

const selectTodoItemViewModels = createSelector(
  selectTodoItemEntities,
  selectFilteringItemsBy,
  (items, filter) => {
    if (filter === 'complete') {
      return [...items.filter((i) => i.completed)];
    }
    if (filter === 'incomplete') {
      return [...items.filter((i) => i.completed === false)];
    }
    return items;
  }
);

const selectItemsStats = createSelector(
  selectTodoItemEntities,
  selectNumberOfTodoItems,
  selectFilteringItemsBy,
  (items, total, filter) =>
    ({
      total,
      completed: items.filter((i) => i.completed).length,
      incomplete: items.filter((i) => i.completed === false).length,
      showing: filter,
    } as fromModels.FilterButtonsViewModel)
);
// 4. What the component needs (Models)

export const selectTodoItemFromId = (id: string) =>
  createSelector(selectTodoItemDictionary, (items) => items[id]);

export const selectTodosViewModel = createSelector(
  selectTodoItemViewModels,
  selectItemsStats,
  (items, filterButtons) =>
    ({
      clearCompletedEnabled: filterButtons.completed > 0,
      dataLoaded: true,
      filterButtons,
      items,
    } as fromModels.TodosViewModel)
);
