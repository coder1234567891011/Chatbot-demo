import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Signing you in...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(private oidcService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcService.checkAuth().subscribe({
      next: ({ isAuthenticated }) => {
        if (isAuthenticated) {
          console.log('User is authenticated');
          // Optionally redirect to dashboard or home
          window.location.href = '/';
        } else {
          console.error('Authentication failed');
        }
      },
      error: (err) => {
        console.error('Error during authentication callback:', err);
      },
    });
  }
}