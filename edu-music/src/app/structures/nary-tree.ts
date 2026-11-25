/** Árbol N-ario (usado para el menú lateral). */
export class NaryNode<T> {
  children: NaryNode<T>[] = [];
  constructor(public value: T) {}
  addChild(child: NaryNode<T>): NaryNode<T> {
    this.children.push(child);
    return child;
  }
}

/** DFS: recorre en profundidad devolviendo el nivel de cada nodo. */
export function dfs<T>(node: NaryNode<T>, depth = 0): { value: T; depth: number }[] {
  return [{ value: node.value, depth }, ...node.children.flatMap((c) => dfs(c, depth + 1))];
}

/** BFS: recorre por niveles. */
export function bfs<T>(root: NaryNode<T>): { value: T; depth: number }[] {
  const out: { value: T; depth: number }[] = [];
  const queue: { node: NaryNode<T>; depth: number }[] = [{ node: root, depth: 0 }];
  while (queue.length) {
    const { node, depth } = queue.shift()!;
    out.push({ value: node.value, depth });
    node.children.forEach((c) => queue.push({ node: c, depth: depth + 1 }));
  }
  return out;
}
