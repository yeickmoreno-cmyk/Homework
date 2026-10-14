export interface Book {
  name: string;
  isbn: string;
  author: string;
  editorial: string;
}

export class Stack {
  items: Book[] = [];

  // Punto 1: Crear y manejar la pila
  push(value: Book) {
    this.items.push(value);
  }

  pop() {
    return this.items.length > 0 ? this.items.pop() : null;
  }

  // Invierte el arreglo visualmente para que el último agregado salga arriba (LIFO)
  print() {
    return this.items.slice().reverse();
  }
}