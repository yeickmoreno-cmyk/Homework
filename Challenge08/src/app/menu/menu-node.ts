import { Type } from '@angular/core';
export const BASE = '/ejercicio1';
export class MenuNode {
  children: MenuNode[] = [];

  constructor(
    public title: string,
    public link: string,
    public component?: Type<unknown>,
    public expanded = false,  
    public footer = false,    
  ) {}

   get url(): string {
    return BASE + this.link;
  } 

  addChild(child: MenuNode): MenuNode {
    this.children.push(child);
    return this;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}

export function flatten(node: MenuNode): MenuNode[] {
  return [node, ...node.children.flatMap(flatten)];
}