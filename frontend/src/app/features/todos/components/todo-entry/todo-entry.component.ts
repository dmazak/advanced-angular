import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ItemsEvents } from '../../state/actions/item.actions';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit {
  form = this.formBuilder.group({
    description: [''],
  });
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {}

  submit(foci: HTMLInputElement) {
    const payload = this.form.get('description')?.value;
    this.store.dispatch(ItemsEvents.todoItemCreated({ payload }));
    foci.value = '';
    foci.focus();
  }
}
