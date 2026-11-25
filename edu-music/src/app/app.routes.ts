import { Routes } from '@angular/router';
import { Shell } from './components/shell';
import { authGuard } from './guards/auth.guard';
import { Cancion } from './pages/cancion';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { NoEncontrado } from './pages/no-encontrado';
import { Ranking } from './pages/ranking';
import { Recomendaciones } from './pages/recomendaciones';

export const routes: Routes = [
  { path: 'login', component: Login }, // pantalla completa, sin layout
  {
    path: '',
    component: Shell, // layout con rutas hijas
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', component: Home },
      { path: 'ranking', component: Ranking },
      { path: 'recomendaciones', component: Recomendaciones },
      { path: 'cancion/:id', component: Cancion },
      {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES), // lazy loading
      },
      { path: '**', component: NoEncontrado },
    ],
  },
];
