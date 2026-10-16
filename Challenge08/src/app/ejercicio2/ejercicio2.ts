import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeView } from '../pages/tree-view/tree-view';

@Component({
  selector: 'app-ejercicio2',
  imports: [RouterOutlet, TreeView],
  templateUrl: './ejercicio2.html',
  styleUrl: './ejercicio2.css',
})
export class Ejercicio2 {}