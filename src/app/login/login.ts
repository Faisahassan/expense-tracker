import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');

  async login() {
    try {
      await this.authService.login(this.email(), this.password());
      this.router.navigate(['/transactions']); // go to your app
    } catch (err: any) {
      this.error.set(err.message);
    }
  }
}