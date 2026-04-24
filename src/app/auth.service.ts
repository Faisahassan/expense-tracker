import { Injectable } from '@angular/core';
import { auth } from './firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // REGISTER
  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  // LOGIN
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // LOGOUT
  async logout() {
    return await signOut(auth);
  }
}