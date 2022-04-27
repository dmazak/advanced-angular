import { Component, Input, OnInit } from '@angular/core';
import { FilterButtonsViewModel } from '../../models';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css'],
})
export class TodoFilterComponent implements OnInit {
  @Input() model: FilterButtonsViewModel | null = null;
  constructor() {}

  ngOnInit(): void {}
}
