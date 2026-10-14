import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NodeType } from '../models/tree-node';
import { AuthService } from '../services/auth.service';
import { FsTreeService } from '../services/fs-tree.service';
import { TreeItem } from './tree-item';

@Component({
  selector: 'app-explorer',
  imports: [FormsModule, TreeItem],
  template: `
    <header class="bar">
      <h1>Archivos del equipo</h1>
      <div class="who">
        <span>{{ auth.email() }}</span>
        <button class="ghost" type="button" (click)="auth.logout()">Cerrar sesión</button>
      </div>
    </header>

    <main class="layout">
      <section class="panel" aria-label="Árbol de carpetas y archivos">
        @if (fs.isPending() && !fs.items().length) { <p class="muted">Cargando…</p> }
        <app-tree-item [node]="fs.tree()" [selectedId]="selectedId()" (picked)="selectedId.set($event)" />
        @if (!fs.isPending() && !fs.items().length) {
          <p class="muted">Aún no hay nada. Crea la primera carpeta desde el panel.</p>
        }
      </section>

      <aside class="panel">
        <h2>Crear en {{ target() }}</h2>
        <form (ngSubmit)="create()">
          <input name="name" [(ngModel)]="name" placeholder="Nombre" required />
          <select name="type" [(ngModel)]="type">
            <option value="folder">Carpeta</option>
            <option value="file">Archivo</option>
          </select>
          <button type="submit" [disabled]="fs.isPending()">Crear</button>
        </form>
        @if (fs.error()) { <p class="err" role="alert">{{ fs.error() }}</p> }
        <p class="muted">Selecciona una carpeta en el árbol para elegir dónde crear. Los archivos no admiten contenido.</p>
      </aside>
    </main>
  `,
})
export class Explorer implements OnInit {
  readonly auth = inject(AuthService);
  readonly fs = inject(FsTreeService);

  selectedId = signal<string | null>(null);
  target = computed(() => this.fs.tree().find(this.selectedId() ?? '')?.value.name ?? 'la raíz (/)');
  name = '';
  type: NodeType = 'folder';

  ngOnInit() { this.fs.load(); }

  async create() {
    await this.fs.create(this.name, this.type, this.selectedId());
    if (!this.fs.error()) this.name = '';
  }
}
