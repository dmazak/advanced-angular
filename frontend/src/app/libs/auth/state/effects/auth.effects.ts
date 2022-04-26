import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { tap } from 'rxjs';
import { AuthEvents } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthEvents.loginRequested),
        tap(() => this.oidcService.authorize())
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private oidcService: OidcSecurityService
  ) {}
}
