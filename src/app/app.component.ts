import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  isAuthenticated = false;

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        console.warn('authenticated: ', isAuthenticated);
        if(!this.isAuthenticated){
          this.login()
        }
      }
    )
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    // Clear session storage
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    window.location.href = "https://us-east-1c7hbbdwui.auth.us-east-1.amazoncognito.com/login?client_id=p56hoqvlims7aer5hlf1d6lau&code_challenge=GEM5Km0MPoxga4Dbj9jP2Ta0PyYRbVP4IdT2h9UUKWo&code_challenge_method=S256&nonce=8b89a04a6723c1ac474abe97f5fe75e9caJ1iO731&redirect_uri=http://localhost:4200/auth-callback&response_type=code&scope=openid+phone+email";
  }
}
