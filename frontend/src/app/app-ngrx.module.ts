import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { externalModules } from './build-specifics';
import { reducers } from './state';
import { CustomSerializer } from './state/router-sanitizer';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    externalModules,
  ],
  exports: [],
})
export class AppNgrxModule {}
