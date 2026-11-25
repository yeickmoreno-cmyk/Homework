import { Component, computed, inject, signal } from '@angular/core';
import { Song } from '../models/song';
import { MusicService } from '../services/music.service';
import { PlayerService } from '../services/player.service';
import { UiService } from '../services/ui.service';
import { Cover } from './cover';
import { Icon } from './icon';

/** Panel lateral de cola: se desliza desde la derecha, igual que en Spotify. */
@Component({
  selector: 'app-queue-panel',
  imports: [Icon, Cover],
  template: `
    <div class="queue-wrap" [class.open]="ui.queueOpen()">
      <aside class="queue" aria-label="Cola de reproducción">
        <header>
          <h2>Cola</h2>
          <button class="icon-btn" (click)="ui.closeQueue()" aria-label="Cerrar cola"><app-icon name="close" /></button>
        </header>

        <h3>Reproduciendo ahora</h3>
        @if (player.current(); as s) {
          <div class="qrow active" (click)="player.togglePlay()">
            <app-cover [song]="s" [size]="44" />
            <div class="info"><strong>{{ s.title }}</strong><small>{{ s.artist }}</small></div>
            <app-icon [name]="player.isPlaying() ? 'pause' : 'play'" />
          </div>
        } @else { <p class="empty">Nada reproduciéndose.</p> }

        <h3>
          A continuación
          @if (queued().length) { <button class="btn small outline" (click)="player.clearQueue()">Vaciar</button> }
        </h3>
        @for (s of queued(); track $index; let i = $index) {
          <div class="qrow" (click)="playQueued(i, s)">
            <app-cover [song]="s" [size]="44" />
            <div class="info"><strong>{{ s.title }}</strong><small>{{ s.artist }}</small></div>
            <button class="icon-btn small" (click)="$event.stopPropagation(); player.removeFromQueue(i)" aria-label="Quitar de la cola"><app-icon name="close" [size]="18" /></button>
          </div>
        } @empty { <p class="empty">Tu cola está vacía. Añade pistas aquí abajo.</p> }

        <h3>Añadir pistas</h3>
        <label class="search" style="height: 40px">
          <app-icon name="search" [size]="18" />
          <input placeholder="Buscar para añadir (Trie)" [value]="q()" (input)="onQ($event)" />
        </label>
        <p class="empty" style="padding-left: 0">{{ q().trim() ? 'Resultados' : 'Recomendadas (según el grafo)' }}</p>
        @for (s of suggestions(); track s.id) {
          <div class="qrow" (click)="player.enqueue(s.id)">
            <app-cover [song]="s" [size]="44" />
            <div class="info"><strong>{{ s.title }}</strong><small>{{ s.artist }}</small></div>
            <button class="icon-btn small" (click)="$event.stopPropagation(); player.playNext(s.id)" title="Reproducir a continuación"><app-icon name="next" [size]="18" /></button>
            <button class="icon-btn small" (click)="$event.stopPropagation(); player.enqueue(s.id)" title="Añadir a la cola"><app-icon name="plus" [size]="18" /></button>
          </div>
        } @empty { <p class="empty">Sin resultados.</p> }

        @if (recent().length) {
          <h3>Reproducidas recientemente</h3>
          @for (s of recent(); track $index) {
            <div class="qrow" (click)="player.play(s.id)">
              <app-cover [song]="s" [size]="44" />
              <div class="info"><strong>{{ s.title }}</strong><small>{{ s.artist }}</small></div>
            </div>
          }
        }
      </aside>
    </div>
  `,
})
export class QueuePanel {
  ui = inject(UiService);
  player = inject(PlayerService);
  private music = inject(MusicService);
  q = signal('');

  private toSongs(ids: string[]): Song[] {
    const map = this.music.byId();
    return ids.map((id) => map.get(id)).filter((s): s is Song => !!s);
  }
  queued = computed(() => this.toSongs(this.player.upNext()));
  recent = computed(() => this.toSongs([...this.player.history()].reverse().slice(0, 5)));

  suggestions = computed<Song[]>(() => {
    const taken = new Set([this.player.currentId(), ...this.player.upNext()]);
    const query = this.q().trim();
    const cur = this.player.currentId();
    const base = query
      ? this.music.suggest(query)
      : [...(cur ? this.music.related(cur).map((r) => r.node) : []), ...this.music.topK(12)];
    const seen = new Set<string>();
    return base.filter((s) => !taken.has(s.id) && !seen.has(s.id) && seen.add(s.id)).slice(0, 8);
  });

  onQ(e: Event): void { this.q.set((e.target as HTMLInputElement).value); }
  playQueued(i: number, s: Song): void { this.player.removeFromQueue(i); this.player.play(s.id); }
}
