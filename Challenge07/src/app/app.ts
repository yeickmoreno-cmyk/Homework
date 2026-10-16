import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './menu/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="layout">
      <app-sidebar />
      <main class="content"><router-outlet /></main>
    </div>
  `,
  styles: [`
    .layout { display: flex; }
    .content { flex: 1; padding: 24px; font-family: sans-serif; }
  `],
})
export class App {}