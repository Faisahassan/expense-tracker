import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAuth, updatePassword } from 'firebase/auth';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
 templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  auth = getAuth();

  newPassword = signal<string>('');

  get currentUser() {
    return this.auth.currentUser;
  }

  async changePassword() {
    if (!this.currentUser) return;

    try {
      await updatePassword(this.currentUser, this.newPassword());
      alert('Password updated successfully');
      this.newPassword.set('');
    } catch (error: any) {
      alert(error.message);
    }
  }
}