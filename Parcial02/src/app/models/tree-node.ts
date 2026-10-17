export type NodeType = 'folder' | 'file';

/*Documento tal como se guarda en Firestore (colección plana, enlazada por parentId). */
export interface FsItem {
  id?: string;
  name: string;
  type: NodeType;
  parentId: string | null; // null = hijo directo de la raíz
  ownerEmail: string;      // dato validador: quién lo creó
  createdAt?: unknown;
}

/** Nodo de un árbol n-ario implementado desde cero. */
export class TreeNode {
  readonly children: TreeNode[] = [];
  constructor(readonly value: FsItem) {}

  get isFolder(): boolean { return this.value.type === 'folder'; }
  isLeaf(): boolean { return this.children.length === 0; }

  /** Regla de negocio: un archivo no tiene hijos y los nombres son únicos entre hermanos. */
  assertCanAdopt(name: string): void {
    if (!this.isFolder) throw new Error('Un archivo no puede tener hijos: elige una carpeta.');
    if (this.children.some(c => c.value.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(`Ya existe "${name}" en esta carpeta.`);
    }
  }

  addChild(node: TreeNode): void {
    this.assertCanAdopt(node.value.name);
    this.children.push(node);
  }

  /** DFS: profundidad primero (visita el nodo y luego cada rama completa). */
  dfs(visit: (n: TreeNode, depth: number) => void, depth = 0): void {
    visit(this, depth);
    for (const c of this.children) c.dfs(visit, depth + 1);
  }

  /** BFS: nivel por nivel, de izquierda a derecha. */
  bfs(visit: (n: TreeNode) => void): void {
    const cola: TreeNode[] = [this];
    while (cola.length > 0) {
      const actual = cola.shift()!;
      visit(actual);
      cola.push(...actual.children);
    }
  }

  find(id: string): TreeNode | null {
    if (this.value.id === id) return this;
    for (const c of this.children) {
      const r = c.find(id);
      if (r) return r;
    }
    return null;
  }
}

/** Reconstruye el árbol completo con base a lista en BD. */
export function buildTree(items: FsItem[]): TreeNode {
  const root = new TreeNode({ name: '/', type: 'folder', parentId: null, ownerEmail: '' });
  const map = new Map(items.map(i => [i.id!, new TreeNode(i)]));
  for (const node of map.values()) {
    const parent = node.value.parentId ? map.get(node.value.parentId) : root;
    try { parent?.addChild(node); } catch { /* dato inconsistente: se omite */ }
  }
  root.dfs(n => n.children.sort((a, b) =>
    Number(b.isFolder) - Number(a.isFolder) || a.value.name.localeCompare(b.value.name)));
  return root;
}
