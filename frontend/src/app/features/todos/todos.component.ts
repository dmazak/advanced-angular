import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodosViewModel } from './models';
import { selectTodosViewModel } from './state';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TodosComponent implements OnInit {
  model$!: Observable<TodosViewModel>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.model$ = this.store.select(selectTodosViewModel);
  }
}
