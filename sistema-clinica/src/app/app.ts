import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LinkedList,
  DoublyLinkedList,
  CircularLinkedList,
  CircularDoublyLinkedList,
} from './models/structure';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  // Inputs del formu
  public nombrePaciente = '';
  public motivoPaciente = '';

  // Estructuras
  private listaPacientes = new LinkedList();
  private historial = new DoublyLinkedList();
  private rotacionMedicos = new CircularLinkedList();
  private comite = new CircularDoublyLinkedList();

  // Signals para reflejar estado HTML
  public pacientes = signal<any[]>([]);
  public historialArray = signal<any[]>([]);
  public medicoGuardia = signal<any>(null);
  public comiteArray = signal<any[]>([]);

  private intervalo: any;
  private contadorId = 1;

  ngOnInit() {
    this.rotacionMedicos.cargar([
      { nombre: 'Dr. Camilo Sinfu', especialidad: 'General' },
      { nombre: 'Dra. Daniela Shifu', especialidad: 'Pediatria' },
      { nombre: 'Dr. Arias Castillos ', especialidad: 'Urgencias' },
    ]);
    this.medicoGuardia.set(this.rotacionMedicos.actual());

    this.comite.cargar([
      { nombre: 'Juan Alvares', cargo: 'Directora' },
      { nombre: 'Suzana Perdomo', cargo: 'Subdirector' },
      { nombre: 'Naru Uzuma', cargo: 'Tesorera' },
      { nombre: 'Pedro Salazar', cargo: 'Secretario' },
    ]);
    this.comiteArray.set(this.comite.toArray());

    // Rota cada 10s
    this.intervalo = setInterval(() => {
      this.medicoGuardia.set(this.rotacionMedicos.rotar());
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  agregarPaciente() {
    if (!this.nombrePaciente.trim()) return;

    this.listaPacientes.append({
      id: this.contadorId++,
      nombre: this.nombrePaciente,
      motivo: this.motivoPaciente,
    });

    this.pacientes.set(this.listaPacientes.toArray());
    this.nombrePaciente = '';
    this.motivoPaciente = '';
  }

  atenderPaciente() {
    const paciente = this.listaPacientes.removeFirst(); // sale de lista simple
    if (!paciente) return;

    this.historial.append({
      ...paciente,
      fecha: new Date(),
      medico: this.medicoGuardia().nombre,
    }); 
    // entra al historial

    this.pacientes.set(this.listaPacientes.toArray());
    this.historialArray.set(this.historial.toArrayReciente());
  }

  avanzarComite() {
    this.comite.siguiente();
    this.comiteArray.set(this.comite.toArray());
  }

  retrocederComite() {
    this.comite.anterior();
    this.comiteArray.set(this.comite.toArray());
  }
}
