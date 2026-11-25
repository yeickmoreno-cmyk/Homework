import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/** Rutas hijas: este componente solo es el "contenedor" con router-outlet. */
@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="page"><h1 class="greet">Panel de administración</h1>
    <p class="muted">Sesión: {{ auth.user()?.name }}</p>
    <p>
      <a routerLink="agregar" routerLinkActive="ok">Agregar canción</a> ·
      <a routerLink="estadisticas" routerLinkActive="ok">Estadísticas</a>
    </p>
    <router-outlet /></div>
  `,
})
export class AdminShell {
  auth = inject(AuthService);
}
