import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserLoggedIn } from 'src/app/libs/auth/state';
import { AuthEvents } from 'src/app/libs/auth/state/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn$!: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(selectUserLoggedIn);
  }

  logIn() {
    this.store.dispatch(AuthEvents.loginRequested());
  }
}
