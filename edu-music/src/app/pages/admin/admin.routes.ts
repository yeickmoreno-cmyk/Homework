import { Routes } from '@angular/router';
import { AdminShell } from './admin-shell';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'agregar' },
      { path: 'agregar', loadComponent: () => import('./add-song').then((m) => m.AddSong) },
      { path: 'estadisticas', loadComponent: () => import('./stats').then((m) => m.Stats) },
    ],
  },
];
