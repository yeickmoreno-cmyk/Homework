import { Queue } from './queue';

/** Grafo NO dirigido con lista de adyacencia. */
export class Graph<T> {
  private nodes = new Map<string, T>();
  private adjacency = new Map<string, Set<string>>();

  addNode(id: string, value: T): void {
    this.nodes.set(id, value);
    if (!this.adjacency.has(id)) this.adjacency.set(id, new Set());
  }

  addEdge(a: string, b: string): void {
    if (!this.nodes.has(a) || !this.nodes.has(b) || a === b) return;
    this.adjacency.get(a)!.add(b);
    this.adjacency.get(b)!.add(a); // no dirigido: ida y vuelta
  }

  removeNode(id: string): void {
    for (const n of this.adjacency.get(id) ?? []) this.adjacency.get(n)?.delete(id);
    this.adjacency.delete(id);
    this.nodes.delete(id);
  }

  searchNode(id: string): T | undefined { return this.nodes.get(id); }
  isEmpty(): boolean { return this.nodes.size === 0; }
  neighbors(id: string): string[] { return [...(this.adjacency.get(id) ?? [])]; }
  degree(id: string): number { return this.adjacency.get(id)?.size ?? 0; }
  size(): number { return this.nodes.size; }

  edgeCount(): number {
    let total = 0;
    for (const s of this.adjacency.values()) total += s.size;
    return total / 2;
  }

  printAdjacency(id: string): T[] {
    return this.neighbors(id).map((n) => this.nodes.get(n)!);
  }

  print(): void {
    for (const [id, set] of this.adjacency) console.log(id, '->', [...set]);
  }

  /** BFS: nodos alcanzables hasta cierta profundidad, con su distancia. */
  related(id: string, maxDepth = 2): { node: T; distance: number }[] {
    const dist = new Map<string, number>([[id, 0]]);
    const queue = new Queue<string>();
    queue.enqueue(id);
    while (!queue.isEmpty()) {
      const cur = queue.dequeue()!;
      const d = dist.get(cur)!;
      if (d >= maxDepth) continue;
      for (const n of this.neighbors(cur)) {
        if (!dist.has(n)) { dist.set(n, d + 1); queue.enqueue(n); }
      }
    }
    return [...dist]
      .filter(([k]) => k !== id)
      .map(([k, d]) => ({ node: this.nodes.get(k)!, distance: d }));
  }
}
