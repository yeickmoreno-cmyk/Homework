import { Injectable, computed, signal } from '@angular/core';
import { EDGES, SONGS } from '../data/catalog';
import { Song } from '../models/song';
import { Graph } from '../structures/graph';
import { MaxHeap } from '../structures/max-heap';
import { Trie } from '../structures/trie';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private counter = 100;

  readonly songs = signal<Song[]>(SONGS.map((s) => ({ ...s })));
  readonly edges = signal<[string, string][]>([...EDGES]);
  readonly query = signal(''); // texto del buscador superior

  readonly byId = computed(() => new Map(this.songs().map((s) => [s.id, s])));
  readonly genres = computed(() => [...new Set(this.songs().map((s) => s.genre))]);

  /** Trie con los títulos */
  readonly trie = computed(() => {
    const t = new Trie();
    this.songs().forEach((s) => t.insert(s.title, s.id));
    return t;
  });

  /** Max Heap por reproducciones */
  readonly heap = computed(() => {
    const h = new MaxHeap<Song>((s) => s.plays);
    h.heapify(this.songs());
    return h;
  });

  /** Grafo no dirigido de canciones similares */
  readonly graph = computed(() => {
    const g = new Graph<Song>();
    this.songs().forEach((s) => g.addNode(s.id, s));
    this.edges().forEach(([a, b]) => g.addEdge(a, b));
    return g;
  });

  readonly totalPlays = computed(() => this.songs().reduce((acc, s) => acc + s.plays, 0));

  suggest(prefix: string): Song[] {
    const map = this.byId();
    return this.trie()
      .startsWith(prefix)
      .map((id) => map.get(id)!)
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 12);
  }

  exists(title: string): boolean { return this.trie().search(title); }
  topK(k: number): Song[] { return this.heap().topK(k); }

  related(id: string): { node: Song; distance: number }[] {
    return this.graph()
      .related(id, 2)
      .sort((a, b) => a.distance - b.distance || b.node.plays - a.node.plays);
  }

  addSong(data: { title: string; artist: string; genre: string }, similarIds: string[]): Song {
    const song: Song = { id: 's' + this.counter++, ...data, plays: 0, duration: 180 };
    this.songs.update((list) => [...list, song]);
    this.edges.update((e) => [...e, ...similarIds.map((s) => [song.id, s] as [string, string])]);
    return song;
  }

  registerPlay(id: string): void {
    this.songs.update((list) => list.map((s) => (s.id === id ? { ...s, plays: s.plays + 1 } : s)));
  }
}
