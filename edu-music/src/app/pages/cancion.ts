import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cover } from '../components/cover';
import { Icon } from '../components/icon';
import { ItunesService } from '../services/itunes.service';
import { MusicService } from '../services/music.service';
import { PlayerService } from '../services/player.service';

/** Ruta dinámica /cancion/:id?from=ranking (route param + query param como inputs). */
@Component({
  selector: 'app-cancion',
  imports: [RouterLink, Cover, Icon],
  template: `
    <div class="page">
      <a class="btn outline small" style="align-self: flex-start" [routerLink]="'/' + (from() ?? 'inicio')"><app-icon name="back" [size]="18" /> Volver</a>
      @if (song(); as s) {
        <div style="display: flex; gap: 24px; align-items: flex-end; flex-wrap: wrap">
          <app-cover [song]="s" [size]="220" [image]="cover()" />
          <div>
            <small>CANCIÓN</small>
            <h1 style="font-size: 3rem; font-weight: 800">{{ s.title }}</h1>
            <p>{{ s.artist }} · <span class="badge">{{ s.genre }}</span> · {{ s.plays }} reproducciones</p>
            <button class="btn" (click)="player.toggleSong(s.id)">
              <app-icon [name]="player.currentId() === s.id && player.isPlaying() ? 'pause' : 'play'" />
              {{ player.currentId() === s.id && player.isPlaying() ? 'Pausar' : 'Reproducir' }}
            </button>
            <button class="btn outline" style="margin-left: 8px" (click)="player.enqueue(s.id)"><app-icon name="plus" [size]="18" /> Cola</button>
          </div>
        </div>
        <section class="shelf">
          <h2>Te puede gustar</h2>
          @for (r of related(); track r.node.id) {
            <div class="row">
              <div class="info">
                <a [routerLink]="['/cancion', r.node.id]" [queryParams]="{ from: from() }"><strong>{{ r.node.title }}</strong></a>
                <small>{{ r.node.artist }}</small>
              </div>
              <button class="icon-btn" (click)="player.enqueue(r.node.id)"><app-icon name="plus" /></button>
            </div>
          } @empty { <p class="muted">Sin recomendaciones.</p> }
        </section>
      } @else { <p class="error">La canción no existe.</p> }
    </div>
  `,
})
export class Cancion {
  music = inject(MusicService);
  player = inject(PlayerService);
  private itunes = inject(ItunesService);

  id = input.required<string>();
  from = input<string>();

  song = computed(() => this.music.byId().get(this.id()));
  related = computed(() => this.music.related(this.id()).slice(0, 6));
  cover = signal<string | null>(null);

  constructor() {
    // fetch + AbortController: si el usuario cambia de pantalla se cancela la petición
    effect((onCleanup) => {
      const s = this.song();
      if (!s) return;
      const ctrl = new AbortController();
      onCleanup(() => ctrl.abort());
      this.cover.set(null);
      this.itunes
        .artwork(`${s.title} ${s.artist}`, ctrl.signal)
        .then((url) => this.cover.set(url))
        .catch(() => {});
    });
  }
}
