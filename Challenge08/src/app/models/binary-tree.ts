export class TreeNode {
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(public value: number) {}

  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }
}

// Formato que espera d3.hierarchy
export interface HierarchyData {
  value: number;
  children?: HierarchyData[];
}

export class BinaryTree {
  root: TreeNode | null = null;

  // Menor -> izquierda, mayor -> derecha. No acepta duplicados.
  insert(value: number): boolean {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return true;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return false; // duplicado

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return true;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return true;
        }
        current = current.right;
      }
    }
  }

  // N - L - R
  preOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // L - N - R  (en un ABB sale ordenado)
  inOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // L - R - N
  postOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Buscar
  contains(value: number): boolean {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // convertir a d3
  toHierarchy(): HierarchyData | null {
    const convert = (node: TreeNode | null): HierarchyData | null => {
      if (!node) return null;
      const children = [convert(node.left), convert(node.right)]
        .filter((c): c is HierarchyData => c !== null);
      return children.length > 0
        ? { value: node.value, children }
        : { value: node.value };
    };
    return convert(this.root);
  }
}