import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { JuegoNumeros } from './juego-numeros/juego-numeros';

// si agregaste login/admin:
import { LoginComponent } from './login/login';
import { PanelAdminComponent } from './panel-admin/panel-admin';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'juego-numeros', component: JuegoNumeros },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: PanelAdminComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];
