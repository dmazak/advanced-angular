import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoItemViewModel } from '../../models';
import { ItemsEvents } from '../../state/actions/item.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input() model: TodoItemViewModel[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {}

  markCompleted(id: string) {
    this.store.dispatch(ItemsEvents.todoItemMarkedComplete({ payload: id }));
  }
}
