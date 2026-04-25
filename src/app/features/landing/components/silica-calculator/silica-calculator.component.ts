import { Component, signal, computed, effect, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SilicaCalculatorService } from '../../../../core/services/silica-calculator.service';
import { CalculationResult, ResidueType, ProcessMethod } from '../../../../core/models/silica-calculation.model';

@Component({
  selector: 'app-silica-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="calculator" id="calculator">
      <div class="container-section">
        <div class="calculator__header">
          <span class="calculator__subtitle">Calculadora científica</span>
          <h2 class="calculator__title">Calcula tu potencial de rendimiento</h2>
          <p class="calculator__description">
            Descubre cuánto puedes ganar transformando tu tamo de arroz en sílice amorfa de alta pureza.
          </p>
        </div>
        
        <div class="calculator__content">
          <!-- Input Panel -->
          <div class="calculator__input-panel">
            <form [formGroup]="calculatorForm">
              <!-- Step 1: Residue Type -->
              <div class="calculator__step">
                <label class="calculator__label">
                  <span class="calculator__step-number">1</span>
                  Tipo de residuo
                </label>
                <div class="calculator__options">
                  @for (residue of residueTypes; track residue.type) {
                    <button 
                      type="button"
                      class="calculator__option"
                      [class.selected]="selectedResidueType() === residue.type"
                      (click)="setResidueType(residue.type)">
                      <div class="calculator__option-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                        </svg>
                      </div>
                      <span class="calculator__option-name">{{ residue.name }}</span>
                      <span class="calculator__option-info">SiO₂: {{ (residue.silicaMedia * 100).toFixed(1) }}%</span>
                    </button>
                  }
                </div>
              </div>
              
              <!-- Step 2: Amount -->
              <div class="calculator__step">
                <label class="calculator__label">
                  <span class="calculator__step-number">2</span>
                  Cantidad de residuo
                </label>
                <div class="calculator__input-group">
                  <input 
                    type="number" 
                    formControlName="amount"
                    class="calculator__input"
                    placeholder="Ingresa la cantidad"
                    min="0.001"
                    max="999999"
                    step="any">
                  <select formControlName="unit" class="calculator__select">
                    <option value="kg">kg</option>
                    <option value="toneladas">toneladas</option>
                    <option value="cargas">cargas (125 kg)</option>
                  </select>
                </div>
                @if (calculatorForm.get('amount')?.invalid && calculatorForm.get('amount')?.touched) {
                  <p class="calculator__error">Cantidad mínima: 0,001 kg | Máximo: 999.999 kg</p>
                }
              </div>
              
              <!-- Step 3: Process Method -->
              <div class="calculator__step">
                <label class="calculator__label">
                  <span class="calculator__step-number">3</span>
                  Método de procesamiento
                </label>
                <div class="calculator__methods">
                  @for (method of processMethods; track method.method) {
                    <button 
                      type="button"
                      class="calculator__method"
                      [class.selected]="selectedProcessMethod() === method.method"
                      (click)="setProcessMethod(method.method)">
                      <div class="calculator__method-header">
                        <span class="calculator__method-name">{{ method.name }}</span>
                        <span class="calculator__method-yield">{{ (method.yield * 100).toFixed(1) }}% rendimiento</span>
                      </div>
                      <div class="calculator__method-details">
                        <span>{{ method.temperature }}</span>
                        <span>{{ method.pretreatment }}</span>
                      </div>
                      <div class="calculator__method-purity">
                        Pureza: {{ (method.purityMedia * 100).toFixed(1) }}%
                      </div>
                    </button>
                  }
                </div>
              </div>
            </form>
          </div>
          
          <!-- Results Panel -->
          <div class="calculator__results">
            <h3 class="calculator__results-title">Resultados</h3>
            
            @if (hasValidInput()) {
              <div class="calculator__result-cards">
                <!-- Silica Result -->
                <div class="calculator__result-card">
                  <div class="calculator__result-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="calculator__result-label">Sílice obtenible</div>
                  <div class="calculator__result-value">{{ formatWeight(result()?.silicaKg || 0) }}</div>
                  <div class="calculator__result-range">
                    {{ formatWeight(result()?.silicaKgMin || 0) }} - {{ formatWeight(result()?.silicaKgMax || 0) }}
                  </div>
                  <div class="calculator__result-percent">
                    Rendimiento: {{ result()?.yieldPercent?.toFixed(1) }}%
                  </div>
                </div>
                
                <!-- Purity Result -->
                <div class="calculator__result-card">
                  <div class="calculator__result-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M9 14l2-2 2 2"/>
                    </svg>
                  </div>
                  <div class="calculator__result-label">Pureza SiO₂</div>
                  <div class="calculator__result-value">{{ result()?.purityPercent?.toFixed(1) }}%</div>
                  <div class="calculator__result-grade" [class]="result()?.grade === 'especial' ? 'grade-especial' : 'grade-industrial'">
                    Grado {{ result()?.grade === 'especial' ? 'Especial' : 'Industrial' }}
                  </div>
                  <div class="calculator__result-area">
                    Área: ~{{ result()?.surfaceArea?.toFixed(0) }} m²/g
                  </div>
                </div>
                
                <!-- Industrial Value -->
                <div class="calculator__result-card">
                  <div class="calculator__result-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2c.393 0 .77-.082 1.105-.236M12 20c-1.657 0-3-.895-3-2s1.343-2 3-2c.393 0 .77.082 1.105.236M6 12a6 6 0 1112 0 6 6 0 01-12 0z"/>
                    </svg>
                  </div>
                  <div class="calculator__result-label">Valor Industrial</div>
                  <div class="calculator__result-value">{{ formatCOP(result()?.industrialMinCOP || 0) }}</div>
                  <div class="calculator__result-range">
                    hasta {{ formatCOP(result()?.industrialMaxCOP || 0) }}
                  </div>
                  <div class="calculator__result-note">$2-5 USD/kg</div>
                </div>
                
                <!-- Special Value -->
                <div class="calculator__result-card calculator__result-card--highlight">
                  <div class="calculator__result-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                  <div class="calculator__result-label">Valor Especial</div>
                  <div class="calculator__result-value">{{ formatCOP(result()?.especialMinCOP || 0) }}</div>
                  <div class="calculator__result-range">
                    hasta {{ formatCOP(result()?.especialMaxCOP || 0) }}
                  </div>
                  <div class="calculator__result-note">$10-50 USD/kg</div>
                </div>
                
                <!-- Environmental -->
                <div class="calculator__result-card calculator__result-card--green">
                  <div class="calculator__result-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 5.519A8.002 8.002 0 0114.945 11H17a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M3.055 11a8.003 8.003 0 014.945-7.945M3.055 11a8.003 8.003 0 017.945-4.945M3.055 11h4.945"/>
                    </svg>
                  </div>
                  <div class="calculator__result-label">Multas evitadas</div>
                  <div class="calculator__result-value">{{ formatCOP(result()?.fineAvoidedCOP || 0) }}</div>
                  <div class="calculator__result-range">
                    {{ result()?.hectaresEquivalent?.toFixed(2) }} ha equivalentes
                  </div>
                  <div class="calculator__result-note">3.000 kg tamo/ha</div>
                </div>
              </div>
            } @else {
              <div class="calculator__empty">
                <div class="calculator__empty-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <p>Ingresa los datos para ver los resultados</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .calculator {
      @apply py-20 md:py-28 bg-white;
      
      &__header {
        @apply text-center mb-16;
      }
      
      &__subtitle {
        @apply text-accent-600 font-medium tracking-wide uppercase text-sm mb-2 block;
      }
      
      &__title {
        @apply text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4;
      }
      
      &__description {
        @apply text-lg text-gray-600 max-w-3xl mx-auto;
      }
      
      &__content {
        @apply grid grid-cols-1 lg:grid-cols-2 gap-8;
      }
      
      &__input-panel {
        @apply bg-gray-50 rounded-xl p-8;
      }
      
      &__step {
        @apply mb-8;
      }
      
      &__label {
        @apply flex items-center gap-2 text-gray-700 font-semibold mb-4;
      }
      
      &__step-number {
        @apply w-6 h-6 rounded-full bg-primary-500 text-white text-sm flex items-center justify-center;
      }
      
      &__options {
        @apply grid grid-cols-1 sm:grid-cols-3 gap-4;
      }
      
      &__option {
        @apply bg-white rounded-lg p-4 text-center border-2 border-transparent cursor-pointer;
        @apply transition-all duration-300;
        @apply hover:border-primary-300;
        
        &.selected {
          @apply border-primary-500 bg-primary-50;
        }
      }
      
      &__option-icon {
        @apply w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center;
        
        svg {
          @apply w-5 h-5 text-gray-600;
        }
      }
      
      &__option-name {
        @apply block font-medium text-gray-900 mb-1;
      }
      
      &__option-info {
        @apply block text-sm text-gray-500;
      }
      
      &__input-group {
        @apply flex gap-2;
      }
      
      &__input {
        @apply flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200;
        @apply outline-none transition-all;
      }
      
      &__select {
        @apply px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200;
        @apply outline-none transition-all;
      }
      
      &__error {
        @apply text-red-500 text-sm mt-2;
      }
      
      &__methods {
        @apply grid grid-cols-1 gap-4;
      }
      
      &__method {
        @apply bg-white rounded-lg p-4 text-left border-2 border-transparent cursor-pointer;
        @apply transition-all duration-300;
        @apply hover:border-gray-300;
        
        &.selected {
          @apply border-primary-500 bg-primary-50;
        }
      }
      
      &__method-header {
        @apply flex justify-between items-center mb-2;
      }
      
      &__method-name {
        @apply font-semibold text-gray-900;
      }
      
      &__method-yield {
        @apply bg-primary-100 text-primary-700 text-sm px-2 py-1 rounded;
      }
      
      &__method-details {
        @apply text-sm text-gray-600 mb-2;
      }
      
      &__method-purity {
        @apply text-sm text-accent-600 font-medium;
      }
      
      &__results {
        @apply bg-gray-900 rounded-xl p-8 text-white;
      }
      
      &__results-title {
        @apply text-2xl font-bold mb-6;
      }
      
      &__result-cards {
        @apply grid grid-cols-1 sm:grid-cols-2 gap-4;
      }
      
      &__result-card {
        @apply bg-gray-800 rounded-lg p-4;
        
        &--highlight {
          @apply bg-gradient-to-br from-primary-600 to-primary-700;
        }
        
        &--green {
          @apply bg-gradient-to-br from-accent-600 to-accent-700;
        }
      }
      
      &__result-icon {
        @apply w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2;
        
        svg {
          @apply w-5 h-5;
        }
      }
      
      &__result-label {
        @apply text-sm text-gray-300 mb-1;
      }
      
      &__result-value {
        @apply text-2xl font-bold mb-1;
      }
      
      &__result-range {
        @apply text-sm text-gray-400;
      }
      
      &__result-percent {
        @apply text-sm text-primary-300 mt-2;
      }
      
      &__result-grade {
        @apply text-sm px-2 py-1 rounded mt-2;
        
        &.grade-industrial {
          @apply bg-blue-500/30 text-blue-300;
        }
        
        &.grade-especial {
          @apply bg-purple-500/30 text-purple-300;
        }
      }
      
      &__result-area,
      &__result-note {
        @apply text-sm text-gray-400 mt-1;
      }
      
      &__empty {
        @apply flex flex-col items-center justify-center py-16 text-gray-400;
      }
      
      &__empty-icon {
        @apply w-16 h-16 mb-4;
        
        svg {
          @apply w-full h-full;
        }
      }
    }
  `]
})
export class SilicaCalculatorComponent implements OnInit {
  calculatorForm!: FormGroup;
  
  selectedResidueType = signal<ResidueType>('tamo');
  selectedProcessMethod = signal<ProcessMethod>('estandar');
  
  result = signal<CalculationResult | null>(null);
  
  residueTypes = this.calcService.residueTypes;
  processMethods = this.calcService.processMethods;
  
  hasValidInput = computed(() => {
    const amount = this.calculatorForm?.get('amount')?.value;
    return amount && amount > 0;
  });
  
  constructor(
    private fb: FormBuilder,
    private calcService: SilicaCalculatorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    this.calculatorForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(0.001), Validators.max(999999)]],
      unit: ['kg']
    });
    
    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculate();
    });
    
    // Initial calculation
    setTimeout(() => this.calculate(), 0);
  }
  
  setResidueType(type: ResidueType): void {
    this.selectedResidueType.set(type);
    this.calculate();
  }
  
  setProcessMethod(method: ProcessMethod): void {
    this.selectedProcessMethod.set(method);
    this.calculate();
  }
  
  calculate(): void {
    if (!this.calculatorForm.valid) {
      this.result.set(null);
      return;
    }
    
    const { amount, unit } = this.calculatorForm.value;
    
    this.result.set(
      this.calcService.calculate(
        amount,
        this.selectedResidueType(),
        this.selectedProcessMethod(),
        unit
      )
    );
  }
  
  formatCOP(value: number): string {
    return this.calcService.formatCOP(value);
  }
  
  formatWeight(kg: number): string {
    return this.calcService.formatWeight(kg);
  }
}