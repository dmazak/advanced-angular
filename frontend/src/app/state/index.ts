import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
export interface ApplicationState {
  router: RouterReducerState<any>;
}
export const reducers: ActionReducerMap<ApplicationState> = {
  router: routerReducer,
};
