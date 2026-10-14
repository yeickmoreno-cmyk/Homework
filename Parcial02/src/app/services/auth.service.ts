import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  User, createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private resolveAuthReady!: () => void;
  private readonly authReady = new Promise<void>(resolve => {
    this.resolveAuthReady = resolve;
  });
  readonly user = signal<User | null>(null);
  readonly email = computed(() => this.user()?.email ?? null);

  constructor() {
    onAuthStateChanged(auth, user => {
      this.user.set(user);
      this.resolveAuthReady();
    });
  }

  whenReady(): Promise<void> { return this.authReady; }
  login(email: string, password: string) { return signInWithEmailAndPassword(auth, email, password); }
  register(email: string, password: string) { return createUserWithEmailAndPassword(auth, email, password); }

  async logout() {
    await signOut(auth);
    this.router.navigate(['/login']);
  }
}
