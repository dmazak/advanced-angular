import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EnvironmentModule } from 'src/app/libs/environment/environment.module';
import { OnboardComponent } from './components/onboard/onboard.component';
import { MustBeAuthenticatedGuard } from './guards/authenticated.guard';
import { UsersDataService } from './services/users-data.service';
import { featureName, reducers } from './state';
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
        canActivate: [MustBeAuthenticatedGuard],
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
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([]),
    EnvironmentModule,
  ],
  providers: [UsersDataService, AsyncCheckValidators, MustBeAuthenticatedGuard],
})
export class UsersModule {}
