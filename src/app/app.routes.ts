import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { JuegoNumeros } from './juego-numeros/juego-numeros';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'juego-numeros', component: JuegoNumeros },
  { path: '**', redirectTo: '/home' }
];