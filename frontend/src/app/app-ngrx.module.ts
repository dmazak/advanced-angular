import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { externalModules } from './build-specifics';
import { reducers } from './state';
import { CustomSerializer } from './state/router-sanitizer';
// This will be the configuration for all of our NGRX Stuff. This will have to be imported into the AppModule like we do with the routing module
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
