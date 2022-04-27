import { Component, Input, OnInit } from '@angular/core';
import { TodoItemViewModel } from '../../models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input() model: TodoItemViewModel[] = [];
  constructor() {}

  ngOnInit(): void {}
}
