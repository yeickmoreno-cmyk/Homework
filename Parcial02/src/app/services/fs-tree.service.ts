import { Injectable, computed, inject, signal } from '@angular/core';
import { addDoc, collection, doc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthService } from './auth.service';
import { FsItem, NodeType, buildTree } from '../models/tree-node';

const COL = 'fs_nodes';

@Injectable({ providedIn: 'root' })
export class FsTreeService {
  private auth = inject(AuthService);

  readonly items = signal<FsItem[]>([]);
  readonly tree = computed(() => buildTree(this.items()));
  readonly isPending = signal(false);
  readonly error = signal<string | null>(null);

  load() { return this.run(() => this.fetch()); }

  create(name: string, type: NodeType, parentId: string | null) {
    return this.run(async () => {
      const email = this.auth.email();
      if (!email) throw new Error('Debes iniciar sesión para crear carpetas o archivos.');
      const clean = name.trim();
      if (!clean) throw new Error('El nombre es obligatorio.');

      const parent = parentId ? this.tree().find(parentId) : this.tree();
      if (!parent) throw new Error('La carpeta destino ya no existe.');
      parent.assertCanAdopt(clean); // archivo sin hijos + nombre único

      const item: Omit<FsItem, 'id'> = { name: clean, type, parentId, ownerEmail: email };
      await addDoc(collection(db, COL), { ...item, createdAt: serverTimestamp() });
      await this.fetch();
    });
  }

  remove(id: string) {
    return this.run(async () => {
      const node = this.tree().find(id);
      if (!node) throw new Error('El elemento ya no existe.');
      const doomed: FsItem[] = [];
      node.dfs(n => doomed.push(n.value));
      if (doomed.some(i => i.ownerEmail !== this.auth.email())) {
        throw new Error('Solo puedes eliminar carpetas cuyo contenido creaste tú.');
      }
      const batch = writeBatch(db);
      doomed.forEach(i => batch.delete(doc(db, COL, i.id!)));
      await batch.commit();
      await this.fetch();
    });
  }

  private async fetch() {
    const snap = await getDocs(collection(db, COL));
    this.items.set(snap.docs.map(d => ({ id: d.id, ...d.data() }) as FsItem));
  }

  private async run(fn: () => Promise<void>) {
    this.isPending.set(true);
    this.error.set(null);
    try { await fn(); }
    catch (e: any) { this.error.set(e?.message ?? 'Error desconocido'); }
    finally { this.isPending.set(false); }
  }
}
