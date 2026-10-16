import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Inicio } from './inicio/inicio';
import { Login } from './login/login';
import { NoEncontrado } from './no-encontrado/no-encontrado';
import { menuTree } from './menu/menu.data';
import { flatten } from './menu/menu-node';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },

  // Ejercicio 1 = Challenge07 (menú + páginas como rutas hijas)
  {
    path: 'ejercicio1',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ejercicio1/ejercicio1').then((m) => m.Ejercicio1),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'settings/security-privacy' },
      ...flatten(menuTree)
        .filter((n) => n.component)
        .map((n) => ({ path: n.link.slice(1), component: n.component! })),
    ],
  },

  {
    path: 'ejercicio2',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ejercicio2/ejercicio2').then((m) => m.Ejercicio2),
  },

  { path: '**', component: NoEncontrado },
];