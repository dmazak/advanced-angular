import { createAction, props } from '@ngrx/store';
import { FilterOptions } from '../reducers/items-filter.reducer';

const itemsFilterSet = createAction(
  '[todos] items filter set',
  props<{ payload: FilterOptions }>()
);
export const ItemFilterEvents = {
  itemsFilterSet,
};

export const ItemFilterCommands = {};

export const ItemFilterDocuments = {};
