class DNode<T> {
  next: DNode<T> = this;
  prev: DNode<T> = this;
  constructor(public value: T) {}
}

/** Lista doblemente enlazada y circular (la usa el reproductor). */
export class DoublyCircularList<T> {
  private head?: DNode<T>;
  private cursor?: DNode<T>;
  length = 0;

  append(value: T): void {
    const node = new DNode(value);
    if (!this.head) {
      this.head = node;
      this.cursor = node;
    } else {
      const tail = this.head.prev;
      tail.next = node;
      node.prev = tail;
      node.next = this.head;
      this.head.prev = node;
    }
    this.length++;
  }

  peek(): T | undefined { return this.cursor?.value; }
  size(): number { return this.length; }

  next(): T | undefined {
    if (!this.cursor) return undefined;
    this.cursor = this.cursor.next;
    return this.cursor.value;
  }

  prev(): T | undefined {
    if (!this.cursor) return undefined;
    this.cursor = this.cursor.prev;
    return this.cursor.value;
  }

  moveTo(pred: (v: T) => boolean): boolean {
    let node = this.head;
    for (let i = 0; i < this.length && node; i++, node = node.next) {
      if (pred(node.value)) { this.cursor = node; return true; }
    }
    return false;
  }

  remove(pred: (v: T) => boolean): void {
    let node = this.head;
    for (let i = 0; i < this.length && node; i++, node = node.next) {
      if (!pred(node.value)) continue;
      if (this.length === 1) { this.head = this.cursor = undefined; }
      else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        if (this.head === node) this.head = node.next;
        if (this.cursor === node) this.cursor = node.next;
      }
      this.length--;
      return;
    }
  }

  toArray(): T[] {
    const out: T[] = [];
    let node = this.head;
    for (let i = 0; i < this.length && node; i++, node = node.next) out.push(node.value);
    return out;
  }

  print(): void { console.log(this.toArray()); }
}
