import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-juego-numeros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './juego-numeros.html',
  styleUrl: './juego-numeros.css'
})
export class JuegoNumeros {
  numeroActual: number = 0;
  haGanado: boolean = false;
  mensaje: string = 'Presiona el botón';
  intentos: number = 0;

  generarNumero() {
    // 1..10 según la fórmula que pide la actividad
    const numero = Math.floor(Math.random() * 10) + 1;
    this.numeroActual = numero;
    this.intentos++;

    if (numero === 7) {
      this.mensaje = '🎉 ¡GANASTE! 🎉';
      this.haGanado = true;
    } else if (numero >= 8) {
      this.mensaje = '📈 ¡Muy alto! Sigue intentando';
      this.haGanado = false;
    } else {
      this.mensaje = '📉 ¡Muy bajo! Sigue intentando';
      this.haGanado = false;
    }
  }

  // (Desafío fácil sugerido en la guía) Reiniciar juego
  reiniciar() {
    this.numeroActual = 0;
    this.mensaje = 'Presiona el botón';
    this.haGanado = false;
    this.intentos = 0;
  }
}
