import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthDocuments } from './libs/auth/state/actions/auth.actions';
import { UserState } from './libs/auth/state/reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(
        ({
          isAuthenticated,
          userData,
        }: {
          isAuthenticated: boolean;
          userData: UserState;
        }) => {
          if (isAuthenticated) {
            this.store.dispatch(AuthDocuments.user({ payload: userData }));
          } else {
            this.store.dispatch(AuthDocuments.user({ payload: null }));
          }
        }
      );
  }
}
