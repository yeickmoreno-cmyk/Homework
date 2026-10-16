import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Queue, Person } from '../../models/atm-queue';

@Component({
  selector: 'app-atm-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atm-management.html',
  styleUrl: './atm-management.css'
})
export class AtmManagementComponent implements OnInit {
  atmQueue = new Queue();
  peopleList: Person[] = [];

  // Formulario (Punto 3): La fecha/hora de llegada se asigna automáticamente
  newPerson: Omit<Person, 'arrivalDate'> = {
    name: '',
    withdrawalAmount: 0
  };

  ngOnInit() {
    // Punto 2: Llenar la cola con datos de prueba (Mock Data)
    const now = new Date();

    this.atmQueue.enqueue({
      name: 'Carlos Pérez',
      withdrawalAmount: 150000,
      arrivalDate: new Date(now.getTime() - 1000 * 60 * 15) // Llegó hace 15 min
    });

    this.atmQueue.enqueue({
      name: 'María Rodríguez',
      withdrawalAmount: 300000,
      arrivalDate: new Date(now.getTime() - 1000 * 60 * 10) // Llegó hace 10 min
    });

    this.atmQueue.enqueue({
      name: 'Juan Gómez',
      withdrawalAmount: 50000,
      arrivalDate: new Date(now.getTime() - 1000 * 60 * 5) // Llegó hace 5 min
    });

    this.updateScreen();
  }

  // Punto 3: Agregar una persona asignándole fecha/hora aleatoria reciente del sistema
  addPerson() {
    if (this.newPerson.name && this.newPerson.withdrawalAmount > 0) {
      // Genera una fecha de llegada aleatoria en los últimos 2 minutos
      const randomRandomTimeOffset = Math.floor(Math.random() * 120000);
      const systemRandomArrivalDate = new Date(Date.now() - randomRandomTimeOffset);

      this.atmQueue.enqueue({
        name: this.newPerson.name,
        withdrawalAmount: this.newPerson.withdrawalAmount,
        arrivalDate: systemRandomArrivalDate
      });

      // Limpia el formulario
      this.newPerson = { name: '', withdrawalAmount: 0 };
      this.updateScreen();
    }
  }

  // Atender a la primera persona en la fila (dequeue)
  attendPerson() {
    const servedPerson = this.atmQueue.dequeue();
    if (servedPerson) {
      alert(`Atendido en cajero: ${servedPerson.name} ($${servedPerson.withdrawalAmount.toLocaleString()})`);
      this.updateScreen();
    }
  }

  // Punto 4: Imprimir la cola en pantalla ordenada por fecha de llegada
  updateScreen() {
    this.peopleList = this.atmQueue.print();
  }
}