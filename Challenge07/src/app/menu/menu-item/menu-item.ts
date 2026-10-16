import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuNode } from '../menu-node';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MenuItemComponent],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItemComponent implements OnInit {
  @Input({ required: true }) node!: MenuNode;
  @Input() level = 0;

  open = signal(false);

  ngOnInit(): void {
    this.open.set(this.node.expanded);
  }

  toggle(): void {
    this.open.update(v => !v);
  }
}