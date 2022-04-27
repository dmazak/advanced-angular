export interface TodosViewModel {
  items: TodoItemViewModel[];
  filterButtons: FilterButtonsViewModel;
  clearCompletedEnabled: boolean;
  dataLoaded: boolean;
}

export interface FilterButtonsViewModel {
  total: number;
  completed: number;
  incomplete: number;
  showing: 'all' | 'incomplete' | 'complete';
}

export interface TodoItemViewModel {
  id: string;
  description: string;
  completed: boolean;
}
