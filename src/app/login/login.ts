import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BotonPersonalizadoComponent } from '../boton-personalizado/boton-personalizado';
import { AuthStore } from '../auth/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BotonPersonalizadoComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  username = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  readonly isFormValid = computed(() => this.username().length > 0 && this.password().length > 0);
  readonly buttonText = computed(() => this.isLoading() ? '🔄 Iniciando sesión...' : '🔑 Iniciar Sesión');

  updateUsername(v: string) { this.username.set(v); if (this.errorMessage()) this.errorMessage.set(''); }
  updatePassword(v: string) { this.password.set(v); if (this.errorMessage()) this.errorMessage.set(''); }

  onSubmit() {
    if (!this.isFormValid() || this.isLoading()) return;
    this.isLoading.set(true); this.errorMessage.set('');

    setTimeout(() => {
      const ok = this.auth.login(this.username(), this.password());
      if (ok) this.router.navigate(['/admin']);
      else this.errorMessage.set('❌ Credenciales incorrectas. Intenta con admin/123456');
      this.isLoading.set(false);
    }, 800);
  }
}
