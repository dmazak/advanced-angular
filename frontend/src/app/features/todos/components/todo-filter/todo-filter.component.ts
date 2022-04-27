import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterButtonsViewModel } from '../../models';
import { ItemFilterEvents } from '../../state/actions/item-filter.actions';
import { FilterOptions } from '../../state/reducers/items-filter.reducer';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css'],
})
export class TodoFilterComponent implements OnInit {
  @Input() model: FilterButtonsViewModel | null = null;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  setFilter(payload: FilterOptions) {
    this.store.dispatch(ItemFilterEvents.itemsFilterSet({ payload }));
  }
}
