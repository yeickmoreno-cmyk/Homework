export interface Person {
  name: string;
  withdrawalAmount: number;
  arrivalDate: Date;
}

export class Queue {
  items: Person[] = [];

  // Punto 1: enqueue agrega al final de la cola (FIFO)
  enqueue(person: Person): void {
    this.items.push(person);
  }

  // Atiende al primero de la fila
  dequeue(): Person | null {
    return this.items.length > 0 ? this.items.shift() || null : null;
  }

  // Revisa el primero de la fila sin quitarlo
  peek(): Person | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  // Imprime la cola ordenada según la hora/fecha de llegada
  print(): Person[] {
    return [...this.items].sort((a, b) => a.arrivalDate.getTime() - b.arrivalDate.getTime());
  }
}