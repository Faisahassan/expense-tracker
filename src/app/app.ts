import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'practice-firestore-crud';

  // Injecting UserService from user.service.ts
  userService = inject(UserService);

  name = signal<string>('');
  email = signal<string>('');

  // This is the hook method that will be called when the component is initialized
  ngOnInit(){
   
  }
  //method called when user clicks on the Add User button.
  addUser() {
    
  }
  //resets form
  resetForm() {
    this.name.set('');
    this.email.set('');
  }

}
