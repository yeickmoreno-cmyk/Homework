import { Component, computed, inject, signal } from '@angular/core';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-add-song',
  template: `
    <div class="panel">
      <h2>Insertar canción (Trie + Grafo)</h2>
      <label class="lbl">Título</label>
      <input class="field" [value]="title()" (input)="title.set(val($event))" />
      @if (similarTitles().length) {
        <small class="muted">Ya existen con ese prefijo: {{ similarTitles().join(', ') }}</small>
      }
      <label class="lbl">Artista</label>
      <input class="field" [value]="artist()" (input)="artist.set(val($event))" />
      <label class="lbl">Género</label>
      <input class="field" [value]="genre()" (input)="genre.set(val($event))" />
      <label class="lbl">Canciones similares (Ctrl/Cmd para varias)</label>
      <select class="select" multiple size="6" style="height:auto" (change)="onSimilar($event)">
        @for (s of music.songs(); track s.id) { <option [value]="s.id">{{ s.title }}</option> }
      </select>
      @if (message()) { <p [class]="isError() ? 'error' : 'ok'">{{ message() }}</p> }
      <br />
      <button class="btn" (click)="save()">Guardar</button>
    </div>
  `,
})
export class AddSong {
  music = inject(MusicService);
  title = signal('');
  artist = signal('');
  genre = signal('');
  similar = signal<string[]>([]);
  message = signal('');
  isError = signal(false);

  similarTitles = computed(() =>
    this.title().trim() ? this.music.suggest(this.title()).map((s) => s.title).slice(0, 3) : [],
  );

  val(e: Event): string { return (e.target as HTMLInputElement).value; }
  onSimilar(e: Event): void {
    this.similar.set(Array.from((e.target as HTMLSelectElement).selectedOptions).map((o) => o.value));
  }

  save(): void {
    const title = this.title().trim();
    if (!title || !this.artist().trim() || !this.genre().trim()) {
      return this.notify('Completa título, artista y género.', true);
    }
    if (this.music.exists(title)) return this.notify('Esa canción ya existe (búsqueda en el Trie).', true);
    this.music.addSong({ title, artist: this.artist().trim(), genre: this.genre().trim() }, this.similar());
    this.title.set(''); this.artist.set(''); this.genre.set(''); this.similar.set([]);
    this.notify('Canción agregada al Trie, al Heap y al Grafo ✔', false);
  }

  private notify(msg: string, error: boolean): void {
    this.message.set(msg);
    this.isError.set(error);
  }
}
