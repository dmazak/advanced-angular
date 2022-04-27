import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { EnvironmentService } from 'src/app/libs/environment/environment.service';
import { selectOnBoardUserForPost } from '..';
import {
  OnboardFormDocuments,
  OnboardFormEvents,
} from '../actions/onboard-form.actions';

@Injectable()
export class OnBoardEffects {
  readonly url: string;

  // accountCreationRequest -> (Magic!) -> accountCreatedSuccessfully
  // when an account is requested:
  // - send it to the server.
  // - on success:
  //   - Clear out the saved form data (seems like a good idea) (in our reducer... sort of)
  //   - Redirect them to a new route telling them "good job", and asking them to log in. - another effect

  afterAccountCreatedTakeThemToTheConfirmation$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(OnboardFormEvents.accountCreatedSuccessfully),

        tap(() => this.router.navigate(['/users', 'account-created']))
      );
    },
    { dispatch: false }
  );
  clearOutTempFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OnboardFormEvents.accountCreatedSuccessfully),
      map(() => OnboardFormDocuments.onboardForm({ payload: null }))
    );
  });

  handleAccountCreation$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(OnboardFormEvents.accountCreationRequested),
        concatLatestFrom(() => this.store.select(selectOnBoardUserForPost)),
        map(([action, user]) => user),
        switchMap((user) =>
          this.client
            .post(this.url, user)
            .pipe(map(() => OnboardFormEvents.accountCreatedSuccessfully()))
        )
      );
    },
    { dispatch: true }
  );
  constructor(
    environments: EnvironmentService,
    private client: HttpClient,
    private actions$: Actions,
    private store: Store,
    private router: Router
  ) {
    this.url = environments.bffUrl + 'users/';
  }
}
