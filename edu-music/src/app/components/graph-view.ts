import { Component, ElementRef, OnDestroy, effect, inject, input, output, viewChild } from '@angular/core';
import * as d3 from 'd3';
import { MusicService } from '../services/music.service';

interface GNode extends d3.SimulationNodeDatum { id: string; title: string; genre: string; }
type GLink = d3.SimulationLinkDatum<GNode>;

/** Visualiza el grafo no dirigido con d3-force. */
@Component({
  selector: 'app-graph-view',
  template: `<svg #svg class="graph" viewBox="0 0 760 460"></svg>`,
})
export class GraphView implements OnDestroy {
  private music = inject(MusicService);
  private svgRef = viewChild<ElementRef<SVGSVGElement>>('svg');
  private sim?: d3.Simulation<GNode, GLink>;
  private color = d3.scaleOrdinal(d3.schemeTableau10);

  selectedId = input<string | null>(null);
  nodeClick = output<string>();

  constructor() {
    effect(() => {
      const el = this.svgRef()?.nativeElement;
      if (!el) return;
      this.draw(el, this.selectedId());
    });
  }

  private draw(el: SVGSVGElement, selected: string | null): void {
    const songs = this.music.songs();
    const graph = this.music.graph();
    const related = new Set(selected ? graph.neighbors(selected) : []);

    const nodes: GNode[] = songs.map((s) => ({ id: s.id, title: s.title, genre: s.genre }));
    const links: GLink[] = this.music.edges().map(([a, b]) => ({ source: a, target: b }));

    this.sim?.stop();
    const svg = d3.select(el);
    svg.selectAll('*').remove();

    const link = svg.append('g').selectAll('line').data(links).join('line').attr('class', 'edge');
    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', (d) => 'node' + (d.id === selected ? ' selected' : '') + (related.has(d.id) ? ' related' : ''))
      .style('cursor', 'pointer')
      .on('click', (_e, d) => this.nodeClick.emit(d.id));

    node.append('circle').attr('r', (d) => (d.id === selected ? 12 : 8)).attr('fill', (d) => this.color(d.genre));
    node.append('text').text((d) => d.title).attr('dx', 13).attr('dy', 4);

    this.sim = d3
      .forceSimulation<GNode>(nodes)
      .force('link', d3.forceLink<GNode, GLink>(links).id((d) => d.id).distance(70))
      .force('charge', d3.forceManyBody().strength(-170))
      .force('center', d3.forceCenter(380, 230))
      .on('tick', () => {
        link
          .attr('x1', (d) => (d.source as GNode).x ?? 0)
          .attr('y1', (d) => (d.source as GNode).y ?? 0)
          .attr('x2', (d) => (d.target as GNode).x ?? 0)
          .attr('y2', (d) => (d.target as GNode).y ?? 0);
        node.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      });
  }

  ngOnDestroy(): void {
    this.sim?.stop(); // limpieza del ciclo de vida
  }
}
