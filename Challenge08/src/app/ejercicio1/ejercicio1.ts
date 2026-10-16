import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../menu/sidebar/sidebar';

@Component({
  selector: 'app-ejercicio1',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './ejercicio1.html',
  styleUrl: './ejercicio1.css',
})
export class Ejercicio1 {}