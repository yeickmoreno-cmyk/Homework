import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TreeNode } from '../models/tree-node';
import { AuthService } from '../services/auth.service';
import { FsTreeService } from '../services/fs-tree.service';

/** Componente recursivo: se renderiza a sí mismo por cada hijo del nodo. */
@Component({
  selector: 'app-tree-item',
  imports: [TreeItem],
  host: { class: 'node' },
  template: `
    <div class="row" [class.sel]="isSelected()" (click)="picked.emit(node().value.id ?? null)">
      @if (node().isFolder && node().children.length) {
        <button class="tog" type="button" (click)="toggle($event)"
                [attr.aria-label]="open() ? 'Contraer' : 'Expandir'">{{ open() ? '−' : '+' }}</button>
      } @else { <span class="tog"></span> }
      <span class="ico" [class.folder]="node().isFolder"></span>
      <span class="name">{{ node().value.name }}</span>
      @if (node().value.ownerEmail) { <small class="owner">{{ node().value.ownerEmail }}</small> }
      @if (canDelete()) {
        <button class="danger" type="button" (click)="remove($event)">Eliminar</button>
      }
    </div>
    @if (open() && node().children.length) {
      <div class="kids">
        @for (c of node().children; track c.value.id) {
          <app-tree-item [node]="c" [selectedId]="selectedId()" (picked)="picked.emit($event)" />
        }
      </div>
    }
  `,
})
export class TreeItem {
  private auth = inject(AuthService);
  private fs = inject(FsTreeService);

  node = input.required<TreeNode>();
  selectedId = input<string | null>(null);
  picked = output<string | null>();
  open = signal(true);

  isSelected = computed(() => (this.node().value.id ?? null) === this.selectedId());
  canDelete = computed(() => !!this.node().value.id && this.node().value.ownerEmail === this.auth.email());

  toggle(e: Event) { e.stopPropagation(); this.open.update(v => !v); }
  remove(e: Event) {
    e.stopPropagation();
    const n = this.node().value;
    if (confirm(`¿Eliminar "${n.name}"${this.node().isFolder ? ' y todo su contenido' : ''}?`)) this.fs.remove(n.id!);
  }
}
