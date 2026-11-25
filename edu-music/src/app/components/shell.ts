import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from '../models/song';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { MusicService } from '../services/music.service';
import { UiService } from '../services/ui.service';
import { NaryNode, dfs } from '../structures/nary-tree';
import { Icon } from './icon';
import { Player } from './player';
import { QueuePanel } from './queue-panel';

/** Layout principal: barra superior, biblioteca, contenido, cola y reproductor. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, Player, QueuePanel],
  template: `
    <div class="app">
      <header class="top">
        <a class="logo" routerLink="/inicio" [attr.aria-label]="appName">
          <img src="logo.png" [alt]="appName" />
          <span class="brand-name">{{ appName }}</span>
        </a>
        <div class="center">
          <a class="icon-btn big" routerLink="/inicio" routerLinkActive="on" aria-label="Inicio" style="background: rgba(255,255,255,.09)"><app-icon name="home" [size]="26" /></a>
          <label class="search">
            <app-icon name="search" />
            <input placeholder="¿Qué quieres reproducir?" [value]="music.query()" (input)="onSearch($event)" />
            @if (music.query()) {
              <button class="icon-btn small" (click)="clear()" aria-label="Borrar búsqueda"><app-icon name="close" [size]="18" /></button>
            }
          </label>
        </div>
        <div class="right">
          @if (auth.user(); as u) {
            <button class="avatar" (click)="menuOpen.set(!menuOpen())" aria-label="Cuenta">{{ u.name.charAt(0).toUpperCase() }}</button>
            @if (menuOpen()) {
              <div class="backdrop" (click)="menuOpen.set(false)"></div>
              <div class="menu"><button (click)="logout()"><app-icon name="back" [size]="18" /> Cerrar sesión</button></div>
            }
          } @else {
            <a class="btn white small" routerLink="/login">Iniciar sesión</a>
          }
        </div>
      </header>

      <nav class="library glass">
        <header><app-icon name="queue" /> Tu biblioteca</header>
        @for (m of menu; track m.value.link) {
          <a class="lib-item" [class.child]="m.depth > 1" [routerLink]="m.value.link" routerLinkActive="active">
            <span class="tile"><app-icon [name]="m.value.icon" [size]="m.depth > 1 ? 18 : 24" /></span>
            <span><strong>{{ m.value.title }}</strong><small>{{ m.value.hint }}</small></span>
          </a>
        }
      </nav>

      <main class="main glass"><router-outlet /></main>
      <app-queue-panel class="queue-slot" />
      <app-player class="player-slot glass" />
      <div class="toast" [class.show]="ui.toast()">{{ ui.toast() }}</div>
    </div>
  `,
})
export class Shell {
  auth = inject(AuthService);
  music = inject(MusicService);
  ui = inject(UiService);
  private router = inject(Router);
  menuOpen = signal(false);
  appName = environment.appName;

  /** Menú construido con un árbol N-ario y recorrido DFS. */
  menu = (() => {
    const root = new NaryNode<MenuItem>({ title: 'Menú', link: '', icon: '', hint: '' });
    root.addChild(new NaryNode({ title: 'Inicio', link: '/inicio', icon: 'home', hint: 'Buscador · Trie' }));
    root.addChild(new NaryNode({ title: 'Ranking', link: '/ranking', icon: 'trophy', hint: 'TOP · Max Heap' }));
    root.addChild(new NaryNode({ title: 'Recomendaciones', link: '/recomendaciones', icon: 'graph', hint: 'Grafo no dirigido' }));
    const admin = root.addChild(new NaryNode({ title: 'Administración', link: '/admin', icon: 'lock', hint: 'Requiere sesión' }));
    admin.addChild(new NaryNode({ title: 'Agregar canción', link: '/admin/agregar', icon: 'plus', hint: 'Panel' }));
    admin.addChild(new NaryNode({ title: 'Estadísticas', link: '/admin/estadisticas', icon: 'trophy', hint: 'Panel' }));
    return dfs(root).slice(1);
  })();

  onSearch(e: Event): void {
    this.music.query.set((e.target as HTMLInputElement).value);
    if (!this.router.url.startsWith('/inicio')) this.router.navigateByUrl('/inicio');
  }
  clear(): void { this.music.query.set(''); }
  logout(): void { this.menuOpen.set(false); this.auth.logout(); }
}
