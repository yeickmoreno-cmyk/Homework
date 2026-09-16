export class DoubleNode {
  value: any;
  next: DoubleNode | null = null;
  prev: DoubleNode | null = null;

  constructor(value: any) {
    this.value = value;
  }
}

export class DoublyLinkedList {
  head: DoubleNode | null = null;
  tail: DoubleNode | null = null;
  length: number = 0;

  append(value: any) {
    const newNode = new DoubleNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }
}