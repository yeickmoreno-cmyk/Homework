import { Type } from '@angular/core';

export class MenuNode {
  children: MenuNode[] = [];

  constructor(
    public title: string,
    public link: string,
    public component?: Type<unknown>,
    public expanded = false,  // ¿inicia abierto?
    public footer = false,    // estilo especial (Logout)
  ) {}

  addChild(child: MenuNode): MenuNode {
    this.children.push(child);
    return this;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}

// DFS: devuelve todos los nodos del árbol
export function flatten(node: MenuNode): MenuNode[] {
  return [node, ...node.children.flatMap(flatten)];
}