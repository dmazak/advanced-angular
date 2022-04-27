import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, concatMap, filter, map, of, switchMap } from 'rxjs';
import { EnvironmentService } from 'src/app/libs/environment/environment.service';
import {
  ItemsCommands,
  ItemsDocuments,
  ItemsEvents,
} from '../actions/item.actions';
import { TodoItemEntity } from '../reducers/items.reducer';

@Injectable()
export class ItemEffects {
  private readonly url: string;

  // add  the todo...
  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemsEvents.todoItemCreated),
      concatMap((a) =>
        this.client
          .post<TodoItemEntity>(this.url, { description: a.payload })
          .pipe(map((payload) => ItemsDocuments.todo({ payload })))
      )
    );
  });
  // Command Load the todos when you navigate to todos.
  loadTheTodosOnNavigation$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerNavigatedAction),
        map((evt) => evt.payload.routerState.url),
        filter((url) => url.startsWith('/todos')),
        map(() => ItemsCommands.loadTodos())
      );
    },
    { dispatch: true }
  );

  // loadTheTodos

  loadTheTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemsCommands.loadTodos),
      switchMap(() =>
        this.client.get<{ data: TodoItemEntity[] }>(this.url).pipe(
          map((r) => r.data),
          map((payload) => ItemsDocuments.todos({ payload })),
          catchError(() => of(ItemsEvents.loadingTodoItemsFailed()))
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private client: HttpClient,
    environments: EnvironmentService
  ) {
    this.url = environments.bffUrl + 'todos/';
  }
}
