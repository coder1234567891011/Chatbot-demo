import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_5Mr7wpzkz',
            redirectUrl: window.location.origin,
            clientId: 'please-enter-auth0-clientId',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
