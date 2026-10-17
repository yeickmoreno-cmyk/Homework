import { Routes } from '@angular/router';
import { menuTree } from './menu/menu.data';
import { flatten } from './menu/menu-node';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'settings/security-privacy' },
  ...flatten(menuTree)
    .filter(n => n.component)
    .map(n => ({ path: n.link.slice(1), component: n.component! })),
];