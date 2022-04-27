import { createAction, props } from '@ngrx/store';
import { TodoItemEntity } from '../reducers/items.reducer';

const loadingTodoItemsFailed = createAction(
  '[todos] loading todo items failed'
);

const todoItemCreated = createAction(
  '[todos] todo item created',
  props<{ payload: string }>()
);

const todoItemMarkedComplete = createAction(
  '[todos] todo item marked complete',
  props<{ payload: string }>()
);
export const ItemsEvents = {
  loadingTodoItemsFailed,
  todoItemCreated,
  todoItemMarkedComplete,
};

const loadTodos = createAction('[todos] load todos');
export const ItemsCommands = {
  loadTodos,
};

const todos = createAction(
  '[todos] todos',
  props<{ payload: TodoItemEntity[] }>()
);
const todo = createAction('[todos] todo', props<{ payload: TodoItemEntity }>());
export const ItemsDocuments = {
  todos,
  todo,
};
