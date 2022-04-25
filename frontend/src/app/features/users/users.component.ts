import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersDataService } from './services/users-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private service: UsersDataService) {}

  public response$!: Observable<boolean>;
  ngOnInit(): void {}

  checkEmail(input: HTMLInputElement) {
    this.response$ = this.service.isEmailAvailable(input.value);
  }

  checkUserName(input: HTMLInputElement) {
    this.response$ = this.service.isUsernameAvailable(input.value);
  }
}
