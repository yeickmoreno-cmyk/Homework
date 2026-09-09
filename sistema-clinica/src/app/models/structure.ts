// ===== NODO SIMPLE (como en la diapositiva "class Node") =====
export class Node {
  value: any;
  next: Node | null;
  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

// ===== NODO DOBLE (con prev, como en Double Linked Lists) =====
export class NodeDoble {
  value: any;
  next: NodeDoble | null;
  prev: NodeDoble | null;
  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// ===== LISTA SIMPLE -> Pacientes en espera =====
export class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail!.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  // Saca el primero de la fila (para "atender" al paciente)
  removeFirst(): any {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return value;
  }

  size() {
    return this.length;
  }

  // Convierte la lista en un array normal para poder pintarla en el HTML
  toArray(): any[] {
    const result: any[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// ===== LISTA DOBLE -> Historial de atención =====
export class DoublyLinkedList {
  head: NodeDoble | null;
  tail: NodeDoble | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new NodeDoble(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }
    this.tail!.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
  }

  size() {
    return this.length;
  }

  // Recorre de más reciente a más antiguo (tail -> head, usando "prev")
  toArrayReciente(): any[] {
    const result: any[] = [];
    let current = this.tail;
    while (current) {
      result.push(current.value);
      current = current.prev;
    }
    return result;
  }
}

// ===== LISTA CIRCULAR -> Rotación de médicos =====
export class CircularLinkedList {
  current: Node | null; // apunta al nodo "activo" (médico de turno)
  length: number;

  constructor() {
    this.current = null;
    this.length = 0;
  }

  // Recibe un array de valores y arma el círculo
  cargar(valores: any[]) {
    let primero: Node | null = null;
    let anterior: Node | null = null;

    for (const v of valores) {
      const nodo = new Node(v);
      if (!primero) primero = nodo;
      if (anterior) anterior.next = nodo;
      anterior = nodo;
      this.length++;
    }
    anterior!.next = primero; // se cierra el círculo
    this.current = primero;
  }

  actual(): any {
    return this.current ? this.current.value : null;
  }

  rotar(): any {
    this.current = this.current!.next;
    return this.actual();
  }
}

// ===== LISTA CIRCULAR DOBLE -> Comité administrativo =====
export class CircularDoublyLinkedList {
  current: NodeDoble | null;
  length: number;

  constructor() {
    this.current = null;
    this.length = 0;
  }

  cargar(valores: any[]) {
    let primero: NodeDoble | null = null;
    let anterior: NodeDoble | null = null;

    for (const v of valores) {
      const nodo = new NodeDoble(v);
      if (!primero) primero = nodo;
      if (anterior) {
        anterior.next = nodo;
        nodo.prev = anterior;
      }
      anterior = nodo;
      this.length++;
    }
    anterior!.next = primero;
    primero!.prev = anterior;
    this.current = primero;
  }

  toArray(): any[] {
    const result: any[] = [];
    if (!this.current) return result;
    let nodo = this.current;
    for (let i = 0; i < this.length; i++) {
      result.push(nodo.value);
      nodo = nodo.next!;
    }
    return result;
  }

  siguiente() {
    this.current = this.current!.next;
  }

  anterior() {
    this.current = this.current!.prev;
  }
}
