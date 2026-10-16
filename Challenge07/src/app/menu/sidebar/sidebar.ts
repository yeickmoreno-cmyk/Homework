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
      width: 240px;
      min-height: 100vh;
      background: #1e2329;
      font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
  `],
})
export class SidebarComponent {
  menu = menuTree;
}