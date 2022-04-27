import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthEvents } from 'src/app/libs/auth/state/actions/auth.actions';

@Component({
  selector: 'app-account-created',
  templateUrl: './account-created.component.html',
  styleUrls: ['./account-created.component.css'],
})
export class AccountCreatedComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  login() {
    this.store.dispatch(AuthEvents.loginRequested());
  }
}
