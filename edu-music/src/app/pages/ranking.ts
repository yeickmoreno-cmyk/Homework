import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../components/icon';
import { Song } from '../models/song';
import { MusicService } from '../services/music.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-ranking',
  imports: [RouterLink, DecimalPipe, Icon],
  template: `
    <div class="page">
      <div>
        <h1 class="greet">Ranking de popularidad</h1>
        <p class="muted">Calculado con un <strong>Max Heap</strong> (pop K veces). Reproduce canciones y mira cómo cambia.</p>
      </div>

      <div class="stat-grid">
        <div class="stat"><strong>{{ music.songs().length }}</strong>Canciones</div>
        <div class="stat"><strong>{{ music.totalPlays() | number }}</strong>Reproducciones</div>
        <div class="stat"><strong>{{ top()[0]?.title ?? '—' }}</strong>Nº 1 actual</div>
      </div>

      <div class="panel">
        <div class="segmented" style="margin-bottom: 20px">
          @for (n of [5, 10, 15]; track n) {
            <button [class.sel]="k() === n" (click)="k.set(n)">TOP {{ n }}</button>
          }
        </div>
        @for (s of top(); track s.id; let i = $index) {
          <div class="rank-row" [class]="'rank-row pos-' + (i + 1)">
            <span class="rank">
              {{ i + 1 }}
            </span>
            <a class="name" [routerLink]="['/cancion', s.id]" [queryParams]="{ from: 'ranking' }">{{ s.title }}</a>
            <div class="track"><div class="bar" [style.width.%]="pct(s)"></div></div>
            <span class="value">{{ s.plays | number }}</span>
            <button class="icon-btn" (click)="player.toggleSong(s.id)" [attr.aria-label]="'Reproducir ' + s.title">
              <app-icon [name]="player.currentId() === s.id && player.isPlaying() ? 'pause' : 'play'" />
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class Ranking {
  music = inject(MusicService);
  player = inject(PlayerService);
  k = signal(10);
  top = computed(() => this.music.topK(this.k()));
  max = computed(() => this.top()[0]?.plays || 1);
  pct(s: Song): number { return (s.plays / this.max()) * 100; }
}
