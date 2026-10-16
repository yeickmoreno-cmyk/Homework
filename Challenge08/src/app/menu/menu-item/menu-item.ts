import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuNode } from '../menu-node';
import { Auth } from '../../auth';

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

  private auth = inject(Auth);
  private router = inject(Router);

  open = signal(false);

  ngOnInit(): void {
    this.open.set(this.node.expanded);
  }

  toggle(): void {
    this.open.update(v => !v);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}