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

  numeroIngresado: number | null = null;
  resultado: string = ''; // Guardará el mensaje para la pantalla

  // 1. Regular Function
  evaluarRegular(numero: number | null): void {
    if (numero === null || isNaN(numero)) {
      this.resultado = 'Por favor, ingresa un número válido.';
      return;
    }

    if (numero % 2 === 0) {
      this.resultado = `[Regular Function] El número ${numero} es PAR (Even)`;
    } else {
      this.resultado = `[Regular Function] El número ${numero} es IMPAR (Odd)`;
    }
  }

  // 2. Arrow Function
  evaluarArrow = (numero: number | null): void => {
    if (numero === null || isNaN(numero)) {
      this.resultado = 'Por favor, ingresa un número válido.';
      return;
    }

    const tipo = numero % 2 === 0 ? 'PAR (Even)' : 'IMPAR (Odd)';
    this.resultado = `[Arrow Function] El número ${numero} es ${tipo}`;
  };
}