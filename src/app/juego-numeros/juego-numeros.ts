import { Component, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-juego-numeros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './juego-numeros.html',
  styleUrl: './juego-numeros.css'
})
export class JuegoNumeros {
  // --- Estado con Signals ---
  numeroActual = signal(0);
  mensaje = signal('Presiona el botón');
  intentos = signal(0);
  haGanado = signal(false);

  // --- Derivado/computed (se actualiza solo) ---
  estadoJuego = computed(() => {
    if (this.haGanado()) return '🎉 ¡GANASTE!';
    if (this.intentos() === 0) return '🎮 ¡Listo para jugar!';
    return `🎯 Intento ${this.intentos()}`;
  });

  // (Opcional) logging simple para ver la reactividad en acción
  constructor() {
    effect(() => {
      console.log('[Juego]', {
        numero: this.numeroActual(),
        intentos: this.intentos(),
        gano: this.haGanado()
      });
    });
  }

  // --- Lógica del juego ---
  generarNumero() {
    const n = Math.floor(Math.random() * 10) + 1; // 1..10
    this.numeroActual.set(n);
    this.intentos.update(i => i + 1);

    if (n === 7) {
      this.mensaje.set('🎉 ¡INCREÍBLE! ¡Obtuviste el 7! 🎉');
      this.haGanado.set(true);
    } else if (n >= 8) {
      this.mensaje.set('📈 ¡Muy alto! Sigue intentando');
      this.haGanado.set(false);
    } else {
      this.mensaje.set('📉 ¡Muy bajo! Sigue intentando');
      this.haGanado.set(false);
    }
  }

  reiniciarJuego() {
    this.numeroActual.set(0);
    this.mensaje.set('Presiona el botón');
    this.intentos.set(0);
    this.haGanado.set(false);
  }
}
