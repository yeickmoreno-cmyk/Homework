import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GraphView } from '../components/graph-view';
import { Icon } from '../components/icon';
import { MusicService } from '../services/music.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-recomendaciones',
  imports: [GraphView, RouterLink, Icon],
  template: `
    <div class="page">
      <div>
        <h1 class="greet">Canciones relacionadas</h1>
        <p class="muted">Grafo <strong>no dirigido</strong>. Haz clic en un nodo o elige una canción.</p>
      </div>
      <select class="select" (change)="onSelect($event)">
        @for (s of music.songs(); track s.id) {
          <option [value]="s.id" [selected]="s.id === selected()">{{ s.title }} — {{ s.artist }}</option>
        }
      </select>
      <app-graph-view [selectedId]="selected()" (nodeClick)="selected.set($event)" />

      <div class="panel">
        <h2 style="margin-bottom: 12px">Recomendadas para "{{ current()?.title }}"</h2>
        @for (r of related(); track r.node.id) {
          <div class="row">
            <div class="info">
              <a [routerLink]="['/cancion', r.node.id]" [queryParams]="{ from: 'recomendaciones' }"><strong>{{ r.node.title }}</strong></a>
              <small>{{ r.node.artist }}</small>
            </div>
            <span class="badge">{{ r.distance === 1 ? 'Directa' : 'A 2 saltos' }}</span>
            <button class="icon-btn" (click)="player.enqueue(r.node.id)" title="Añadir a la cola"><app-icon name="plus" /></button>
          </div>
        } @empty { <p class="muted">Esta canción aún no tiene conexiones.</p> }
      </div>
    </div>
  `,
})
export class Recomendaciones {
  music = inject(MusicService);
  player = inject(PlayerService);
  selected = signal('s1');
  current = computed(() => this.music.byId().get(this.selected()));
  related = computed(() => this.music.related(this.selected()));
  onSelect(e: Event): void { this.selected.set((e.target as HTMLSelectElement).value); }
}
