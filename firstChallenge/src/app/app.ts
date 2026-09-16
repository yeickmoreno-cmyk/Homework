import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  //input
  numeroIngresado: number | null = null;

  //Regular Function
  evaluarRegular(numero: number | null): void {
    if (numero === null || isNaN(numero)) {
      console.log('[Regular Function] Ingresa un número válido.');
      return;
    }

    if (numero % 2 === 0) {
      console.log(`[Regular Function] El número ${numero} es PAR (Even)`);
    } else {
      console.log(`[Regular Function] El número ${numero} es IMPAR (Odd)`);
    }
  }

  //Arrow Function
  evaluarArrow = (numero: number | null): void => {
    if (numero === null || isNaN(numero)) {
      console.log('[Arrow Function] Ingresa un número válido.');
      return;
    }

    const tipo = numero % 2 === 0 ? 'PAR (Even)' : 'IMPAR (Odd)';
    console.log(`[Arrow Function] El número ${numero} es ${tipo}`);
  };
}