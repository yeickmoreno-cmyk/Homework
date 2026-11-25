import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User { email: string; name: string; }

/** Login de demostración con signals. Email: user@mail.com / 123 · Teléfono: cualquier número / código 123 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  readonly user = signal<User | null>(null);
  readonly isLoggedIn = computed(() => this.user() !== null);

  login(email: string, password: string): boolean {
    if (email.trim().toLowerCase() === 'user@mail.com' && password === '123') {
      this.user.set({ email, name: 'user' });
      return true;
    }
    return false;
  }

  loginPhone(phone: string, code: string): boolean {
    if (phone.replace(/\D/g, '').length >= 7 && code === '123') {
      this.user.set({ email: phone, name: 'Usuario' });
      return true;
    }
    return false;
  }

  logout(): void {
    this.user.set(null);
    this.router.navigateByUrl('/login');
  }
}
