import { Component, signal, input, output, computed, effect } from '@angular/core';

@Component({
  selector: 'app-contador-signals',
  standalone: true,
  imports: [],
  templateUrl: './contador-signals.html',
  styleUrl: './contador-signals.css'
})
export class ContadorSignalsComponent {
  // Inputs usando signals (Angular 20 sintaxis correcta)
  readonly titulo = input('Contador con Signals');
  readonly valorInicial = input(0);
  readonly maximo = input(10);
  
  // Output usando signals (Angular 20 sintaxis correcta)
  readonly cambioValor = output<number>();
  
  // Estado interno con signals
  valor = signal(0);
  
  // Computed signals (se calculan automáticamente)
  porcentaje = computed(() => {
    return Math.round((this.valor() / this.maximo()) * 100);
  });
  
  estado = computed(() => {
    const porcentaje = this.porcentaje();
    if (porcentaje === 0) return 'Inicial';
    if (porcentaje < 50) return 'Bajo';
    if (porcentaje < 80) return 'Medio';
    if (porcentaje < 100) return 'Alto';
    return 'Máximo';
  });
  
  colorEstado = computed(() => {
    const estado = this.estado();
    switch (estado) {
      case 'Inicial': return '#666';
      case 'Bajo': return '#4caf50';
      case 'Medio': return '#ff9800';
      case 'Alto': return '#f44336';
      case 'Máximo': return '#9c27b0';
      default: return '#666';
    }
  });
  
  constructor() {
    // Effect: se ejecuta cuando cambian los signals
    effect(() => {
      console.log(`Contador ${this.titulo()}: ${this.valor()} (${this.estado()})`);
    });
    
    // Inicializar valor cuando cambie valorInicial
    effect(() => {
      this.valor.set(this.valorInicial());
    }, { allowSignalWrites: true });
  }
  
  incrementar() {
    if (this.valor() < this.maximo()) {
      this.valor.update(v => v + 1);
      this.cambioValor.emit(this.valor());
    }
  }
  
  decrementar() {
    if (this.valor() > 0) {
      this.valor.update(v => v - 1);
      this.cambioValor.emit(this.valor());
    }
  }
  
  reiniciar() {
    this.valor.set(this.valorInicial());
    this.cambioValor.emit(this.valor());
  }
}