import {
  Component, ElementRef, ViewChild, AfterViewInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { BinaryTree, HierarchyData } from '../../models/binary-tree';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tree-view.html',
  styleUrl: './tree-view.css',
})
export class TreeViewComponent implements AfterViewInit {
  @ViewChild('treeContainer', { static: true }) container!: ElementRef<HTMLDivElement>;

  tree = new BinaryTree();
  newValue: number | null = null;
  searchValue: number | null = null;
  searchResult = '';
    found = false;
    inOrderText = '';
    preOrderText = '';
    postOrderText = '';
    insertMessage = '';
    insertOk = true;
    private messageTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    // 1. Insertar una serie de números
    [50, 30, 70, 20, 40, 60, 80, 35, 45, 65].forEach(v => this.tree.insert(v));

    this.printTraversals();
    this.drawTree();
  }

  // imprimir en consola 
   printTraversals(): void {
    this.inOrderText = this.tree.inOrder().join(' - ');
    this.preOrderText = this.tree.preOrder().join(' - ');
    this.postOrderText = this.tree.postOrder().join(' - ');

    console.log('InOrder   :', this.inOrderText);
    console.log('PostOrder :', this.postOrderText);
    console.log('PreOrder  :', this.preOrderText);
  }

  // Insertar desde la UI 
   addValue(): void {
    if (this.newValue === null) return;

    const value = this.newValue;
    const inserted = this.tree.insert(value);

    this.insertOk = inserted;
    this.insertMessage = inserted
      ? `El valor ${value} fue insertado`
      : `El valor ${value} ya existe en el árbol`;

    // Desaparece solo a los 3 segundos
    clearTimeout(this.messageTimer);
    this.messageTimer = setTimeout(() => (this.insertMessage = ''), 3000);

    this.newValue = null;
    this.printTraversals();

    // Si ya existe, resalta en el arbol
    this.drawTree(inserted ? null : value);
  }
  // Buscar 
    search(): void {
    if (this.searchValue === null) return;
    this.found = this.tree.contains(this.searchValue);
    this.searchResult = this.found
      ? `El valor ${this.searchValue} está en el árbol`
      : `El valor ${this.searchValue} NO está en el árbol`;
    console.log(this.searchResult);
    this.drawTree(this.found ? this.searchValue : null);
  }

  // Dibujar con d3 
  drawTree(highlight: number | null = null): void {
    const data = this.tree.toHierarchy();
    const host = this.container.nativeElement;
    host.innerHTML = ''; // limpiar dibujo anterior
    if (!data) return;

    const width = 800;
    const height = 520;
    const margin = { top: 40, right: 30, bottom: 40, left: 30 };

    const svg = d3.select(host)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // d3.hierarchy construye la jerarquía; d3.tree calcula las posiciones x,y
    const root = d3.hierarchy<HierarchyData>(data);
    const layout = d3.tree<HierarchyData>()
      .size([
        width - margin.left - margin.right,
        height - margin.top - margin.bottom,
      ]);
    layout(root);

    // Enlaces (lineas)
    g.selectAll('path.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#999')
      .attr('stroke-width', 2)
      .attr('d', d3.linkVertical<any, any>()
        .x(d => d.x)
        .y(d => d.y));

    // Nodos
    const nodes = g.selectAll('g.node')
      .data(root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
      .attr('r', 18)
      .attr('fill', d => d.data.value === highlight ? '#f4b400' : '#4db6c6')
      .attr('stroke', '#2a7f8e')
      .style('filter', 'drop-shadow(0 2px 3px rgba(0,0,0,.2))')
      .attr('stroke-width', 2.5);

    nodes.append('text')
      .attr('font-family', '-apple-system, "SF Pro Text", "Segoe UI", sans-serif')
      .attr('font-size', '15px')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#fff')
      .attr('font-weight', 'bold')
      .text(d => d.data.value);
  }
}