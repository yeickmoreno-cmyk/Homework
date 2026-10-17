import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Agrega "/" antes de explorador
  { path: '', redirectTo: '/explorador', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login').then(m => m.Login) },
  {
    path: 'explorador',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/explorador').then(m => m.Explorer),
  },
  // Agrega "/" antes de explorador también aquí
  { path: '**', redirectTo: '/explorador' },
];