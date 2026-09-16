// Lista Enlazada Simple (Canciones)
export class Node {
  value: any;
  next: Node | null = null;
  constructor(value: any) { this.value = value; }
}

export class LinkedList {
  head: Node | null = null;
  tail: Node | null = null;

  append(value: any) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
  }
}

// Lista Doblemente Enlazada (Historial)
export class DoubleNode {
  value: any;
  next: DoubleNode | null = null;
  prev: DoubleNode | null = null;
  constructor(value: any) { this.value = value; }
}

export class DoublyLinkedList {
  head: DoubleNode | null = null;
  tail: DoubleNode | null = null;

  append(value: any) {
    const newNode = new DoubleNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }
}