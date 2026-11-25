import { Injectable, computed, inject, signal } from '@angular/core';
import { DoublyCircularList } from '../structures/doubly-circular-list';
import { Queue } from '../structures/queue';
import { Stack } from '../structures/stack';
import { MusicService } from './music.service';
import { UiService } from './ui.service';

/**
 * Reproductor simulado (sin audio real):
 *  - Lista doblemente enlazada circular -> orden de reproducción
 *  - Cola (FIFO)  -> "A continuación"
 *  - Pila (LIFO)  -> historial para volver atrás
 */
@Injectable({ providedIn: 'root' })
export class PlayerService {
  private music = inject(MusicService);
  private ui = inject(UiService);
  private playlist = new DoublyCircularList<string>();
  private inList = new Set<string>();
  private historyStack = new Stack<string>();
  private waitQueue = new Queue<string>();
  private timer?: ReturnType<typeof setInterval>;

  readonly currentId = signal<string | null>(null);
  readonly history = signal<string[]>([]);
  readonly upNext = signal<string[]>([]);
  readonly isPlaying = signal(false);
  readonly progress = signal(0);
  readonly shuffle = signal(false);
  readonly repeatOne = signal(false);
  readonly volume = signal(70);

  readonly current = computed(() => {
    const id = this.currentId();
    return id ? (this.music.byId().get(id) ?? null) : null;
  });
  readonly duration = computed(() => this.current()?.duration ?? 0);

  private syncPlaylist(): void {
    for (const s of this.music.songs()) {
      if (!this.inList.has(s.id)) { this.playlist.append(s.id); this.inList.add(s.id); }
    }
  }
  private sync(): void {
    this.history.set(this.historyStack.toArray());
    this.upNext.set(this.waitQueue.toArray());
  }
  private setCurrent(id: string): void {
    this.syncPlaylist();
    this.playlist.moveTo((v) => v === id);
    this.currentId.set(id);
    this.progress.set(0);
    this.isPlaying.set(true);
    this.startTimer();
  }
  private startTimer(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.progress.update((p) => p + 1);
      if (this.progress() >= this.duration()) this.ended();
    }, 1000);
  }
  private ended(): void {
    if (this.repeatOne()) { this.progress.set(0); const id = this.currentId(); if (id) this.music.registerPlay(id); }
    else this.next();
  }

  // ---- controles ----
  play(id: string): void {
    const cur = this.currentId();
    if (cur && cur !== id) this.historyStack.push(cur);
    this.setCurrent(id);
    this.music.registerPlay(id);
    this.sync();
  }

  /** Si es la canción actual alterna play/pausa; si no, la reproduce. */
  toggleSong(id: string): void {
    if (this.currentId() === id) this.togglePlay();
    else this.play(id);
  }

  togglePlay(): void {
    if (!this.currentId()) return this.next();
    if (this.isPlaying()) { clearInterval(this.timer); this.isPlaying.set(false); }
    else { this.isPlaying.set(true); this.startTimer(); }
  }

  next(): void {
    const queued = this.waitQueue.dequeue();
    if (queued) return this.play(queued);
    this.syncPlaylist();
    if (this.shuffle()) {
      const pool = this.music.songs().filter((s) => s.id !== this.currentId());
      return this.play(pool[Math.floor(Math.random() * pool.length)].id);
    }
    const id = this.currentId() === null ? this.playlist.peek() : this.playlist.next();
    if (id) this.play(id);
  }

  prev(): void {
    if (this.progress() > 3) return this.progress.set(0);
    const last = this.historyStack.pop();
    if (last) { this.setCurrent(last); }
    else this.progress.set(0);
    this.sync();
  }

  seek(seconds: number): void { this.progress.set(seconds); }
  toggleShuffle(): void { this.shuffle.update((v) => !v); }
  toggleRepeat(): void { this.repeatOne.update((v) => !v); }

  // ---- cola ----
  enqueue(id: string): void {
    this.waitQueue.enqueue(id);
    this.sync();
    this.ui.notify('Añadida a la cola');
  }
  playNext(id: string): void {
    this.waitQueue.enqueueFront(id);
    this.sync();
    this.ui.notify('Se reproducirá a continuación');
  }
  removeFromQueue(index: number): void { this.waitQueue.removeAt(index); this.sync(); }
  clearQueue(): void { this.waitQueue.clear(); this.sync(); }
}
