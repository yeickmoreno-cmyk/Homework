/** Cola FIFO */
export class Queue<T> {
  private items: T[] = [];
  enqueue(v: T): void { this.items.push(v); }
  enqueueFront(v: T): void { this.items.unshift(v); } // "reproducir a continuación"
  dequeue(): T | undefined { return this.items.shift(); }
  removeAt(i: number): void { this.items.splice(i, 1); }
  clear(): void { this.items = []; }
  peek(): T | undefined { return this.items[0]; }
  size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
  toArray(): T[] { return [...this.items]; }
  print(): void { console.log(this.items); }
}
