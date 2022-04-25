import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap,
} from 'rxjs';
import { UsersDataService } from '../services/users-data.service';

@Injectable()
export class AsyncCheckValidators {
  constructor(private service: UsersDataService) {}

  canUseEmailAddressValidator(): AsyncValidatorFn {
    return (control) =>
      control.valueChanges.pipe(
        debounceTime(467),
        distinctUntilChanged(),
        switchMap((value) => this.service.isEmailAvailable(value)),
        map((available) => (available ? null : { canUseEmailAddress: true })),
        first()
      );
  }
}
