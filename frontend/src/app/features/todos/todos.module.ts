import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { TodoEntryComponent } from './components/todo-entry/todo-entry.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { featureName, reducers } from './state';
import { ItemEffects } from './state/effects/item.effects';
import { TodosComponent } from './todos.component';
const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AutoLoginAllRoutesGuard],
  },
];

@NgModule({
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoFilterComponent,
    TodoEntryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveComponentModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([ItemEffects]),
    HttpClientModule,
  ],
  exports: [TodosComponent],
})
export class TodosModule {}
