import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority:
          'http://auth.todo-zoo.com/auth/realms/todo-zoo/.well-known/openid-configuration',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'frontend',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Error,
        ignoreNonceAfterRefresh: true,
        historyCleanupOff: false,
        postLoginRoute: '/dashboard',
      },
    }),
  ],
  exports: [AuthModule],
})
export class AppAuthModule {}
