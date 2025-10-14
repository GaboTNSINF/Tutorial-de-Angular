import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly isAuthenticated = signal(false);
  readonly currentUser = signal<string | null>(null);

  readonly welcomeMessage = computed(() => {
    const u = this.currentUser();
    return u ? `¡Bienvenido, ${u}!` : 'Por favor, inicia sesión';
  });

  login(username: string, password: string): boolean {
    const ok = username === 'admin' && password === '123456';
    if (ok) {
      this.isAuthenticated.set(true);
      this.currentUser.set(username);
    } else {
      this.logout();
    }
    return ok;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }
}
