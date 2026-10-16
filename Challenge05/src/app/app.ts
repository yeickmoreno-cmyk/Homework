import { Component, signal } from '@angular/core';
import { AtmManagementComponent } from './pages/atm-management/atm-management';

@Component({
  imports: [AtmManagementComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Challenge05');
}