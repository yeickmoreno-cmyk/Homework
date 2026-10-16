import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item';
import { menuTree } from '../menu.data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuItemComponent],
  template: `
    <nav class="sidebar">
      @for (node of menu.children; track node.title) {
        <app-menu-item [node]="node" />
      }
    </nav>
  `,
  styles: [`
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 0.1px;
      padding: 0.75rem;
      background: var(--surface);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      font-family: var(--font);
    }
  `],
})
export class Sidebar {
  menu = menuTree;
}