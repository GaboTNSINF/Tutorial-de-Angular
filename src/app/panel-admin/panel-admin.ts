import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BotonPersonalizadoComponent } from '../boton-personalizado/boton-personalizado';
import { AuthStore } from '../auth/auth.store';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [RouterLink, BotonPersonalizadoComponent],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css'
})
export class PanelAdminComponent {
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  user = this.auth.currentUser;
  notifications = 3;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  performAction(action: string) {
    alert(`Acción ejecutada: ${action}`);
  }
}
