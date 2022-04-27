import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { TodosComponent } from './todos.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoEntryComponent } from './components/todo-entry/todo-entry.component';
import { ReactiveComponentModule } from '@ngrx/component';
const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
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
    StoreModule.forFeature(featureName, reducers),
  ],
  exports: [TodosComponent],
})
export class TodosModule {}
