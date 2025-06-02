import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_C7hBBdWUI',
            redirectUrl: 'https://advicechatbot.com/auth-callback',
            clientId: 'p56hoqvlims7aer5hlf1d6lau',
            scope: 'openid phone email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
