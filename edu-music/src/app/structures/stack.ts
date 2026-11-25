/** Pila LIFO */
export class Stack<T> {
  private items: T[] = [];
  push(v: T): void { this.items.push(v); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
  toArray(): T[] { return [...this.items]; }
  print(): void { console.log(this.items); }
}
