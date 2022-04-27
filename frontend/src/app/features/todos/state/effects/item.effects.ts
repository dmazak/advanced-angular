import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, concatMap, filter, map, of, switchMap, tap } from 'rxjs';
import { AuthDocuments } from 'src/app/libs/auth/state/actions/auth.actions';
import { EnvironmentService } from 'src/app/libs/environment/environment.service';
import { selectTodoItemFromId } from '..';
import { WebSocketsService } from '../../services/ws.service';
import {
  ItemsCommands,
  ItemsDocuments,
  ItemsEvents,
} from '../actions/item.actions';
import { TodoItemEntity } from '../reducers/items.reducer';

@Injectable()
export class ItemEffects {
  private readonly url: string;

  startWsWhenThereIsAUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthDocuments.user),
        tap((user) => {
          if (user.payload) {
            this.ws.connect();
          } else {
            this.ws.disconnect();
          }
        })
      );
    },
    { dispatch: false }
  );
  markTodoComplete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ItemsEvents.todoItemMarkedComplete),
        concatLatestFrom((a) =>
          this.store.select(selectTodoItemFromId(a.payload))
        ),
        concatMap(([_, item]) =>
          this.client.post(this.url + 'completed/', item).pipe(
            map(() => ({ ...item, completed: true } as TodoItemEntity)),
            map((payload) => ItemsDocuments.todo({ payload }))
          )
        )
      );
    },
    { dispatch: true }
  );
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
    environments: EnvironmentService,
    private store: Store,
    private ws: WebSocketsService
  ) {
    this.url = environments.bffUrl + 'todos/';
  }
}
