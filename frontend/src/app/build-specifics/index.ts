import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const externalModules = [
  StoreDevtoolsModule.instrument(), // TODO: Hide the auth stuff
];
