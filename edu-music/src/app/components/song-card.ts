import { DecimalPipe } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Song } from '../models/song';
import { PlayerService } from '../services/player.service';
import { Cover } from './cover';
import { Icon } from './icon';

/** Fila de canción (estilo lista de Spotify). Props con input(), eventos con output(). */
@Component({
  selector: 'app-song-card',
  imports: [RouterLink, DecimalPipe, Cover, Icon],
  template: `
    <article class="row" [class.active]="active()" (dblclick)="playSong.emit(song())">
      <div class="lead">
        @if (rank() !== null) { <span class="num">{{ rank() }}</span> }
        <button class="icon-btn row-play" (click)="playSong.emit(song())" [attr.aria-label]="'Reproducir ' + song().title">
          <app-icon [name]="active() && player.isPlaying() ? 'pause' : 'play'" [size]="20" />
        </button>
      </div>
      <app-cover [song]="song()" [size]="40" />
      <div class="info">
        <a [routerLink]="['/cancion', song().id]" [queryParams]="{ from: from() }"><strong>{{ song().title }}</strong></a>
        <small>{{ song().artist }}</small>
      </div>
      <span class="badge">{{ song().genre }}</span>
      <span class="plays">{{ song().plays | number }}</span>
      <div class="row-actions">
        <button class="icon-btn" [class.on]="added()" (click)="add()" [attr.aria-label]="'Añadir a la cola'" title="Añadir a la cola">
          <app-icon [name]="added() ? 'check' : 'plus'" />
        </button>
      </div>
    </article>
  `,
})
export class SongCard {
  player = inject(PlayerService);
  song = input.required<Song>();
  rank = input<number | null>(null);
  from = input('inicio');
  playSong = output<Song>();
  queueSong = output<Song>();
  added = signal(false);

  active(): boolean { return this.player.currentId() === this.song().id; }

  add(): void {
    this.queueSong.emit(this.song());
    this.added.set(true); // feedback visual temporal
    setTimeout(() => this.added.set(false), 1400);
  }
}
