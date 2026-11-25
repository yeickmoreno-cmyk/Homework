import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `
    <h1 class="greet">404</h1>
    <p>La página que buscas no existe.</p>
    <a class="btn small" routerLink="/inicio">Ir al inicio</a>
  `,
})
export class NoEncontrado {}
