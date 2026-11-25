import { Injectable, signal } from '@angular/core';

/** Estado de la interfaz: panel de cola y avisos (toast). */
@Injectable({ providedIn: 'root' })
export class UiService {
  readonly queueOpen = signal(false);
  readonly toast = signal<string | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  toggleQueue(): void { this.queueOpen.update((v) => !v); }
  closeQueue(): void { this.queueOpen.set(false); }

  notify(message: string): void {
    this.toast.set(message);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.toast.set(null), 2200);
  }
}
