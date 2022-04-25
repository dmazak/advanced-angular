import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
})
export class OnboardComponent implements OnInit {
  form = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get username() {
    return this.form.get('username');
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
    }
  }
}
