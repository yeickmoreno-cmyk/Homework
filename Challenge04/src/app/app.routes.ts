
import { Routes } from '@angular/router';
import { BookManagementComponent } from './pages/book-management/book-management';

export const routes: Routes = [
  { path: 'books', component: BookManagementComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];