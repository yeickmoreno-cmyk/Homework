import { Component, computed, inject } from '@angular/core';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-stats',
  template: `
    <div class="stat-grid">
      <div class="stat"><strong>{{ music.graph().size() }}</strong>Nodos</div>
      <div class="stat"><strong>{{ music.graph().edgeCount() }}</strong>Aristas</div>
      <div class="stat"><strong>{{ music.heap().size() }}</strong>Elementos en el heap</div>
    </div>
    <div class="panel" style="margin-top: 24px">
      <h2>Canciones más conectadas</h2>
      <table>
        <tr><th>Canción</th><th>Conexiones</th></tr>
        @for (r of byDegree(); track r.id) {
          <tr><td>{{ r.title }}</td><td>{{ r.degree }}</td></tr>
        }
      </table>
    </div>
  `,
})
export class Stats {
  music = inject(MusicService);
  byDegree = computed(() =>
    this.music
      .songs()
      .map((s) => ({ id: s.id, title: s.title, degree: this.music.graph().degree(s.id) }))
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 8),
  );
}
