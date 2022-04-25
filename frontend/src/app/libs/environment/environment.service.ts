import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface IEnvironment {
  production: boolean;
  bffUrl: string;
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class EnvironmentService implements IEnvironment {
  get production() {
    return environment.production;
  }

  get bffUrl() {
    return environment.bffUrl;
  }

  get apiUrl() {
    return environment.apiUrl;
  }
}
