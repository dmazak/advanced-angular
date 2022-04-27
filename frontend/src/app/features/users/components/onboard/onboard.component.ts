import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription, tap } from 'rxjs';
import { selectOnBoardFormData } from '../../state';
import {
  OnboardFormDocuments,
  OnboardFormEvents,
} from '../../state/actions/onboard-form.actions';
import { TemporaryFormState } from '../../state/reducers/onboard-form.reducer';
import {
  disallowedDomainValidator,
  noSpaceValidator,
  passwordsMustMatchValidator,
} from '../../validators';
import { AsyncCheckValidators } from '../../validators/async-check.validator';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
})
export class OnboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: [
        '',
        [Validators.required, noSpaceValidator],
        [this.asyncValidators.canUseUsernameValidator()],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          disallowedDomainValidator('geico.com'),
        ],
        [this.asyncValidators.canUseEmailAddressValidator()],
      ],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [passwordsMustMatchValidator] }
  );
  constructor(
    private formBuilder: FormBuilder,
    private asyncValidators: AsyncCheckValidators,
    private store: Store
  ) {}
  ngOnInit(): void {
    // TODO: There is a "bug" here. We'll get to it.

    let userData: TemporaryFormState = {};
    const userObservable$ = this.store.select(selectOnBoardFormData).pipe(
      tap((data) => {
        userData = data;
      })
    );
    let s1 = userObservable$.subscribe(); // ## BUG 2
    this.subscriptions.push(s1);

    this.firstName?.setValue(userData?.firstName || '');
    this.lastName?.setValue(userData?.lastName || '');
    this.email?.setValue(userData?.email || '');
    this.userName?.setValue(userData?.userName || '');
    this.password1?.setValue(userData?.password1 || '');
    this.password2?.setValue(userData?.password2 || '');

    this.form.valueChanges
      .pipe(
        debounceTime(450),
        tap((changes) =>
          this.store.dispatch(
            OnboardFormDocuments.onboardForm({ payload: changes })
          )
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get userName() {
    return this.form.get('userName');
  }
  get email() {
    return this.form.get('email');
  }
  get password1() {
    return this.form.get('password1');
  }
  get password2() {
    return this.form.get('password2');
  }

  createAccount() {
    if (this.form.valid) {
      this.store.dispatch(OnboardFormEvents.accountCreationRequested());
    }
  }
}
