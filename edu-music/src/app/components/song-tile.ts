import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../models/song';
import { PlayerService } from '../services/player.service';
import { Cover } from './cover';
import { Icon } from './icon';

/** Tarjeta cuadrada con botón de play al pasar el mouse. */
@Component({
  selector: 'app-song-tile',
  imports: [Cover, Icon],
  template: `
    <div class="tile-card" [class.active]="active()" (click)="open()">
      <app-cover [song]="song()" [size]="170" />
      <button class="fab" (click)="$event.stopPropagation(); playSong.emit(song())" [attr.aria-label]="'Reproducir ' + song().title">
        <app-icon [name]="active() && player.isPlaying() ? 'pause' : 'play'" [size]="24" />
      </button>
      <strong>{{ song().title }}</strong>
      <small>{{ song().artist }}</small>
    </div>
  `,
  styles: [`:host { display: block; } :host ::ng-deep .cover { width: 100% !important; height: auto !important; aspect-ratio: 1; }`],
})
export class SongTile {
  player = inject(PlayerService);
  private router = inject(Router);
  song = input.required<Song>();
  playSong = output<Song>();

  active(): boolean { return this.player.currentId() === this.song().id; }
  open(): void { this.router.navigate(['/cancion', this.song().id], { queryParams: { from: 'inicio' } }); }
}
