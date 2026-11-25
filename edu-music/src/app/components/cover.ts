import { Component, computed, input } from '@angular/core';
import { Song } from '../models/song';

/** Carátula generada a partir del id de la canción (o imagen real si se pasa `image`). */
@Component({
  selector: 'app-cover',
  template: `
    <div class="cover" [style.width.px]="size()" [style.height.px]="size()" [style.background]="gradient()" [style.font-size.px]="size() / 2.4">
      @if (image(); as url) { <img [src]="url" [alt]="song().title" /> } @else { {{ initial() }} }
    </div>
  `,
})
export class Cover {
  song = input.required<Pick<Song, 'id' | 'title'>>();
  size = input(48);
  image = input<string | null>(null);

  initial = computed(() => this.song().title.charAt(0).toUpperCase());
  gradient = computed(() => {
    let h = 0;
    for (const c of this.song().id + this.song().title) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const h1 = h % 360;
    const h2 = (h1 + 40 + ((h >> 8) % 80)) % 360;
    return `linear-gradient(135deg, hsl(${h1} 28% 34%), hsl(${h2} 26% 26%))`;
  });
}
