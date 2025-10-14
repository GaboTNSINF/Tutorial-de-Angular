import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-boton-personalizado',
  standalone: true,
  templateUrl: './boton-personalizado.html',
  styleUrl: './boton-personalizado.css'
})
export class BotonPersonalizadoComponent {
  readonly texto = input('Botón');
  readonly tipo = input<'button' | 'submit'>('button');
  readonly deshabilitado = input(false);
  readonly cargando = input(false);
  readonly variante = input<'primary' | 'secondary' | 'danger'>('primary');
  readonly click = output<Event>();

  onClick(e: Event) {
    if (!this.deshabilitado() && !this.cargando()) this.click.emit(e);
  }
}
