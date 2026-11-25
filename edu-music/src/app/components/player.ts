import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { UiService } from '../services/ui.service';
import { Cover } from './cover';
import { Icon } from './icon';

@Component({
  selector: 'app-player',
  imports: [Icon, Cover, RouterLink],
  template: `
    <div class="player-bar">
      <div class="now">
        @if (p.current(); as s) {
          <app-cover [song]="s" [size]="56" />
          <div class="meta">
            <a [routerLink]="['/cancion', s.id]"><strong>{{ s.title }}</strong></a>
            <small>{{ s.artist }}</small>
          </div>
        } @else { <small>Elige una canción para empezar</small> }
      </div>

      <div class="controls">
        <div class="buttons">
          <button class="icon-btn" [class.on]="p.shuffle()" [attr.aria-pressed]="p.shuffle()" (click)="p.toggleShuffle()" title="Aleatorio"><app-icon name="shuffle" /></button>
          <button class="icon-btn" (click)="p.prev()" title="Anterior"><app-icon name="prev" [size]="24" /></button>
          <button class="play-btn" (click)="p.togglePlay()" [attr.aria-label]="p.isPlaying() ? 'Pausar' : 'Reproducir'">
            <app-icon [name]="p.isPlaying() ? 'pause' : 'play'" [size]="26" />
          </button>
          <button class="icon-btn" (click)="p.next()" title="Siguiente"><app-icon name="next" [size]="24" /></button>
          <button class="icon-btn" [class.on]="p.repeatOne()" [attr.aria-pressed]="p.repeatOne()" (click)="p.toggleRepeat()" title="Repetir canción"><app-icon name="repeat" /></button>
        </div>
        <div class="timeline">
          <small>{{ fmt(p.progress()) }}</small>
          <input class="slider" type="range" min="0" [max]="p.duration() || 1" [value]="p.progress()"
                 [style.--pct]="pct() + '%'" (input)="onSeek($event)" aria-label="Progreso" />
          <small>{{ fmt(p.duration()) }}</small>
        </div>
      </div>

      <div class="extra">
        <button class="icon-btn" [class.on]="ui.queueOpen()" [attr.aria-pressed]="ui.queueOpen()" (click)="ui.toggleQueue()" title="Cola"><app-icon name="queue" /></button>
        <button class="icon-btn" (click)="toggleMute()" title="Volumen"><app-icon [name]="p.volume() === 0 ? 'mute' : 'volume'" /></button>
        <input class="slider vol" type="range" min="0" max="100" [value]="p.volume()" [style.--pct]="p.volume() + '%'" (input)="onVolume($event)" aria-label="Volumen" />
      </div>
    </div>
  `,
})
export class Player {
  p = inject(PlayerService);
  ui = inject(UiService);
  private last = 70;

  pct = computed(() => (this.p.duration() ? (this.p.progress() / this.p.duration()) * 100 : 0));

  fmt(sec: number): string {
    const s = Math.max(0, Math.floor(sec));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }
  onSeek(e: Event): void { this.p.seek(Number((e.target as HTMLInputElement).value)); }
  onVolume(e: Event): void { this.p.volume.set(Number((e.target as HTMLInputElement).value)); }
  toggleMute(): void {
    if (this.p.volume() > 0) { this.last = this.p.volume(); this.p.volume.set(0); }
    else this.p.volume.set(this.last);
  }
}
