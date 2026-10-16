import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Si no hay sesión, redirige al login recordando a dónde quería ir
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};