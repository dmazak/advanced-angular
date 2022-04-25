import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from './router-sanitizer';

export interface ApplicationState {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  router: routerReducer,
};
