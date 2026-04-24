import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
 import { DashboardComponent } from './dashboard/dashboard';
 import { TransactionsComponent } from './transactions/transactions';
  import { CategoryComponent } from './category/category';
 import { BudgetComponent } from './budget/budget';
 import { ProfileComponent } from './profile/profile';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
 { path: 'categories', component: CategoryComponent },
 { path: 'budget', component: BudgetComponent },
 { path: 'profile', component: ProfileComponent }

];