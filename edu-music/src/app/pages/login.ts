import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '../components/icon';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

/** Login en 2 pasos (identificador -> contraseña / código), como el de Spotify. */
@Component({
  selector: 'app-login',
  imports: [Icon],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <img class="logo" src="logo.png" [alt]="appName" />
        <div class="company">{{ appName }}</div>
        <h1>{{ step() === 1 ? 'Bienvenido de nuevo' : mode() === 'email' ? 'Ingresa tu contraseña' : 'Ingresa el código' }}</h1>

        @if (step() === 1) {
          <div class="field-wrap">
            <label class="lbl" for="id">{{ mode() === 'email' ? 'Email' : 'Número de teléfono' }}</label>
            <input id="id" class="field" [type]="mode() === 'email' ? 'email' : 'tel'" [value]="identifier()"
                   [placeholder]="mode() === 'email' ? 'nombre@correo.com' : '300 123 4567'"
                   (input)="identifier.set(val($event))" (keydown.enter)="goNext()" autofocus />
            @if (error()) { <p class="error">{{ error() }}</p> }
          </div>
          <button class="btn block primary" (click)="goNext()">Continuar</button>
          <div class="or">o</div>
          <button class="btn outline block" (click)="switchMode()">
            <app-icon [name]="mode() === 'email' ? 'phone' : 'mail'" [size]="20" />
            {{ mode() === 'email' ? 'Continuar con número de teléfono' : 'Continuar con email' }}
          </button>
          <div class="hint">Demo · Email: user&#64;mail.com / 123 · Teléfono: cualquier número / código 123</div>
        } @else {
          <div class="chip">
            <span>{{ identifier() }}</span>
            <button class="icon-btn small" (click)="back()" aria-label="Cambiar"><app-icon name="back" [size]="18" /></button>
          </div>
          <div class="field-wrap">
            <label class="lbl" for="secret">{{ mode() === 'email' ? 'Contraseña' : 'Código de verificación' }}</label>
            <div class="pw">
              <input id="secret" class="field" [type]="show() ? 'text' : 'password'" [value]="secret()"
                     (input)="secret.set(val($event))" (keydown.enter)="submit()" autofocus />
              <button class="icon-btn" (click)="show.set(!show())" [attr.aria-label]="show() ? 'Ocultar' : 'Mostrar'">
                <app-icon [name]="show() ? 'eyeoff' : 'eye'" />
              </button>
            </div>
            @if (error()) { <p class="error">{{ error() }}</p> }
          </div>
          <button class="btn block primary" [disabled]="loading()" (click)="submit()">
            @if (loading()) { <span class="spinner"></span> } @else { Iniciar sesión }
          </button>
        }
      </div>
    </div>
  `,
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  appName = environment.appName;
  returnUrl = input<string>();
  mode = signal<'email' | 'phone'>('email');
  step = signal<1 | 2>(1);
  identifier = signal('');
  secret = signal('');
  error = signal('');
  show = signal(false);
  loading = signal(false);

  val(e: Event): string { return (e.target as HTMLInputElement).value; }

  switchMode(): void {
    this.mode.update((m) => (m === 'email' ? 'phone' : 'email'));
    this.identifier.set('');
    this.error.set('');
  }

  goNext(): void {
    const id = this.identifier().trim();
    const valid = this.mode() === 'email' ? /^\S+@\S+\.\S+$/.test(id) : id.replace(/\D/g, '').length >= 7;
    if (!valid) return this.error.set(this.mode() === 'email' ? 'Introduce un email válido.' : 'Introduce un número válido.');
    this.error.set('');
    this.step.set(2);
  }

  back(): void { this.step.set(1); this.secret.set(''); this.error.set(''); }

  submit(): void {
    this.loading.set(true);
    this.error.set('');
    setTimeout(() => { // simula la petición al servidor
      const ok = this.mode() === 'email'
        ? this.auth.login(this.identifier(), this.secret())
        : this.auth.loginPhone(this.identifier(), this.secret());
      this.loading.set(false);
      if (ok) this.router.navigateByUrl(this.returnUrl() ?? '/inicio');
      else this.error.set('Credenciales incorrectas. Inténtalo de nuevo.');
    }, 700);
  }
}
