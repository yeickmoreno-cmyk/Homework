/** Max Heap implementado sobre un arreglo (árbol binario completo). */
export class MaxHeap<T> {
  private data: T[] = [];
  constructor(private readonly key: (item: T) => number) {}

  size(): number { return this.data.length; }
  peek(): T | undefined { return this.data[0]; }
  toArray(): T[] { return [...this.data]; }

  push(item: T): void {
    this.data.push(item);
    this.percolateUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (!this.data.length) return undefined;
    const top = this.data[0];
    const last = this.data.pop() as T;
    if (this.data.length) {
      this.data[0] = last;
      this.percolateDown(0);
    }
    return top;
  }

  /** Convierte un arreglo desordenado en heap en O(n). */
  heapify(items: T[]): void {
    this.data = [...items];
    for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) this.percolateDown(i);
  }

  /** Top K sin destruir el heap original. */
  topK(k: number): T[] {
    const copy = new MaxHeap<T>(this.key);
    copy.data = [...this.data];
    const out: T[] = [];
    while (out.length < k && copy.size()) out.push(copy.pop() as T);
    return out;
  }

  private percolateUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.key(this.data[i]) <= this.key(this.data[parent])) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  private percolateDown(i: number): void {
    const n = this.data.length;
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let biggest = i;
      if (l < n && this.key(this.data[l]) > this.key(this.data[biggest])) biggest = l;
      if (r < n && this.key(this.data[r]) > this.key(this.data[biggest])) biggest = r;
      if (biggest === i) break;
      this.swap(i, biggest);
      i = biggest;
    }
  }

  private swap(a: number, b: number): void {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }
}
