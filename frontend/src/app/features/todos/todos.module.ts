import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [TodosComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [TodosComponent],
})
export class TodosModule {}
