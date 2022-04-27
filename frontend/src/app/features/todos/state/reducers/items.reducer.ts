import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

export interface TodoItemEntity {}

export interface ItemsState extends EntityState<TodoItemEntity> {}

export const adapter = createEntityAdapter<TodoItemEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(initialState);

const { selectAll, selectTotal } = adapter.getSelectors();

export const selectAllTodoItemEtities = selectAll;
export const selectTotalNumberOfTodoItems = selectTotal;
