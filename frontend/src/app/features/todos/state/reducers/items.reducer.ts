import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ItemsDocuments } from '../actions/item.actions';

export interface TodoItemEntity {
  id: string;
  description: string;
  completed: boolean;
}

export interface ItemsState extends EntityState<TodoItemEntity> {}

export const adapter = createEntityAdapter<TodoItemEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(ItemsDocuments.todos, (s, a) => adapter.setAll(a.payload, s)),
  on(ItemsDocuments.todo, (s, a) => adapter.upsertOne(a.payload, s))
);

const { selectAll, selectTotal, selectEntities } = adapter.getSelectors();

export const selectAllTodoItemEntities = selectAll;
export const selectTotalNumberOfTodoItems = selectTotal;
export const selectTodoItemDictionary = selectEntities;
