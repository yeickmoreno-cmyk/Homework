import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <section class="auth">
      <h1>Archivos del equipo</h1>
      <p class="lead">
        {{ mode() === 'login' ? 'Inicia sesión para ver y organizar carpetas.' : 'Crea tu cuenta con correo y contraseña.' }}
      </p>
      <form (ngSubmit)="submit()">
        <input name="email" type="email" [(ngModel)]="email" placeholder="Correo" required />
        <input name="password" type="password" [(ngModel)]="password"
               placeholder="Contraseña (mínimo 6 caracteres)" required minlength="6" />
        <button type="submit" [disabled]="busy()">
          {{ mode() === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }}
        </button>
      </form>
      @if (error()) { <p class="err" role="alert">{{ error() }}</p> }
      <button class="link" type="button" (click)="toggle()">
        {{ mode() === 'login' ? 'No tengo cuenta' : 'Ya tengo cuenta' }}
      </button>
    </section>
  `,
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  mode = signal<'login' | 'register'>('login');
  busy = signal(false);
  error = signal<string | null>(null);
  email = '';
  password = '';

  toggle() { this.mode.update(m => (m === 'login' ? 'register' : 'login')); this.error.set(null); }

  async submit() {
    this.busy.set(true);
    this.error.set(null);
    try {
      if (this.mode() === 'login') await this.auth.login(this.email, this.password);
      else await this.auth.register(this.email, this.password);
      this.router.navigate(['/explorador']);
    } catch (e: any) {
      this.error.set(e?.message ?? 'No se pudo completar la acción.');
    } finally {
      this.busy.set(false);
    }
  }
}
