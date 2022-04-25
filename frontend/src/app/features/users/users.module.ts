import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentModule } from 'src/app/libs/environment/environment.module';
import { OnboardComponent } from './components/onboard/onboard.component';
import { UsersDataService } from './services/users-data.service';
import { UsersComponent } from './users.component';
import { AsyncCheckValidators } from './validators/async-check.validator';
const routes: Routes = [
  {
    // /users
    path: 'users',
    component: UsersComponent,
    children: [
      {
        // users/onboard
        path: 'onboard',
        component: OnboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UsersComponent, OnboardComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EnvironmentModule,
  ],
  providers: [UsersDataService, AsyncCheckValidators],
})
export class UsersModule {}
