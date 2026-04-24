import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');

  async register() {
    try {
      await this.authService.register(this.email(), this.password());
      this.router.navigate(['/transactions']); // go to app
    } catch (err: any) {
      this.error.set(err.message);
    }
  }
}