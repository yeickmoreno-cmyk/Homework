export const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

export class TrieNode {
  children = new Map<string, TrieNode>();
  isEndOfWord = false;
  ids: string[] = []; // ids de canciones cuyo título termina aquí
}

/** Trie: la información está en el camino (cada arista es una letra). */
export class Trie {
  private root = new TrieNode(); // raíz vacía

  insert(title: string, id: string): void {
    let node = this.root;
    for (const ch of normalize(title)) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEndOfWord = true;
    if (!node.ids.includes(id)) node.ids.push(id);
  }

  search(title: string): boolean {
    const node = this.find(title);
    return !!node && node.isEndOfWord;
  }

  startsWith(prefix: string, limit = 100): string[] {
    const node = this.find(prefix);
    if (!node) return [];
    const out: string[] = [];
    this.collect(node, out);
    return out.slice(0, limit);
  }

  private find(text: string): TrieNode | null {
    let node = this.root;
    for (const ch of normalize(text)) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  private collect(node: TrieNode, out: string[]): void {
    if (node.isEndOfWord) out.push(...node.ids);
    for (const child of node.children.values()) this.collect(child, out);
  }
}
