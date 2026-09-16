export class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: Node | null = null;
  tail: Node | null = null;
  length: number = 0;

  append(value: any) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
    }
    this.tail = newNode;
    this.length++;
  }
}