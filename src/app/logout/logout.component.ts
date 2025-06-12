import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
