import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserNotLoggedIn } from 'src/app/libs/auth/state';

@Injectable()
export class MustBeAuthenticatedGuard implements CanActivate {
  userIsNotLoggedIn$: Observable<boolean>;
  constructor(private store: Store) {
    this.userIsNotLoggedIn$ = this.store.select(selectUserNotLoggedIn);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userIsNotLoggedIn$;
  }
}
