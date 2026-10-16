import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly VALID_EMAIL = 'user@mail.com';
  private readonly VALID_PASSWORD = '123';

  // Estado privado (escribible) y público (solo lectura)
  private _email = signal<string | null>(this.loadSession());
  readonly email = this._email.asReadonly();

  // Se calcula automáticamente a partir del email
  readonly isLoggedIn = computed(() => this._email() !== null);
  readonly username = computed(() => this._email()?.split('@')[0] ?? '');

  login(email: string, password: string): boolean {
    if (email === this.VALID_EMAIL && password === this.VALID_PASSWORD) {
      this._email.set(email);
      localStorage.setItem('session', email);
      return true;
    }
    return false;
  }

  logout(): void {
    this._email.set(null);
    localStorage.removeItem('session');
  }

  private loadSession(): string | null {
    return localStorage.getItem('session');
  }
}