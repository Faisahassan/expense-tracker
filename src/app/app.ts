import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    @if(showNavbar()){
      <app-navbar></app-navbar>
    }
    <router-outlet></router-outlet>
  `
})
export class App {

  router = inject(Router);

  showNavbar() {
    return this.router.url !== '/' && this.router.url !== '/register';
  }
}