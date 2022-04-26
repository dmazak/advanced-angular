import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { AuthEffects } from './state/effects/auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class IdentityModule {}
