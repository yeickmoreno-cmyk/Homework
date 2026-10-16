import { Component } from '@angular/core';
import { TreeViewComponent } from './pages/tree-view/tree-view';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeViewComponent],
  template: `<app-tree-view />`,
})
export class App {}