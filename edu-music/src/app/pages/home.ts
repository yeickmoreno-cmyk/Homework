import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { SongCard } from '../components/song-card';
import { SongTile } from '../components/song-tile';
import { Song } from '../models/song';
import { MusicService } from '../services/music.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-home',
  imports: [SongCard, SongTile],
  template: `
    <div class="page">
      <h1 class="greet">{{ greeting() }}</h1>

      @if (music.query().trim()) {
        <section class="shelf">
          <h2>Resultados para "{{ music.query() }}"</h2>
          <p>
            @if (exists()) { <span class="ok">✔ La canción existe en el catálogo (Trie.search)</span> }
            @else { <small>No hay coincidencia exacta · mostrando sugerencias por prefijo</small> }
          </p>
          @for (s of results(); track s.id) {
            <app-song-card [song]="s" from="inicio" (playSong)="player.toggleSong($event.id)" (queueSong)="player.enqueue($event.id)" />
          } @empty { <p class="muted">Sin resultados para ese prefijo.</p> }
        </section>
      } @else {
        <div class="segmented" role="tablist">
          <button [class.sel]="genre() === ''" (click)="genre.set('')">Todo</button>
          @for (g of music.genres(); track g) {
            <button [class.sel]="genre() === g" (click)="genre.set(g)">{{ g }}</button>
          }
        </div>
        <section class="shelf">
          <h2>{{ genre() ? 'Populares en ' + genre() : 'Populares ahora' }}</h2>
          <div class="tiles">
            @for (s of popular(); track s.id) {
              <app-song-tile [song]="s" (playSong)="player.toggleSong($event.id)" />
            } @empty { <p class="muted">No hay canciones en este género.</p> }
          </div>
        </section>
        <section class="shelf">
          <h2>Lo más escuchado</h2>
          @for (s of top(); track s.id; let i = $index) {
            <app-song-card [song]="s" [rank]="i + 1" from="inicio" (playSong)="player.toggleSong($event.id)" (queueSong)="player.enqueue($event.id)" />
          }
        </section>
      }
    </div>
  `,
})
export class Home implements OnInit, OnDestroy {
  music = inject(MusicService);
  player = inject(PlayerService);

  genre = signal('');
  results = computed<Song[]>(() => this.music.suggest(this.music.query()));
  exists = computed(() => this.music.exists(this.music.query()));
  popular = computed<Song[]>(() =>
    this.music.topK(this.music.songs().length).filter((s) => !this.genre() || s.genre === this.genre()).slice(0, 12),
  );
  top = computed<Song[]>(() => this.music.topK(5));
  greeting = signal(this.calcGreeting());
  private timer?: number;

  private calcGreeting(): string {
    const h = new Date().getHours();
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  }

  ngOnInit(): void {
    document.title = 'Inicio · YJ Eon Forge Education';
    this.timer = window.setInterval(() => this.greeting.set(this.calcGreeting()), 60000);
  }
  ngOnDestroy(): void { clearInterval(this.timer); }
}
