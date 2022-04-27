import { createReducer, on } from '@ngrx/store';
import { ItemFilterEvents } from '../actions/item-filter.actions';

export type FilterOptions = 'all' | 'incomplete' | 'complete';
export interface ItemsFilterState {
  filteringBy: FilterOptions;
}

const initialState: ItemsFilterState = {
  filteringBy: 'all',
};

export const reducer = createReducer(
  initialState,
  on(ItemFilterEvents.itemsFilterSet, (s, a) => ({
    ...s,
    filteringBy: a.payload,
  }))
);
