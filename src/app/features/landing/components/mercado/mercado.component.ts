import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface MarketData {
  grade: string;
  priceRange: string;
  applications: string[];
  color: string;
}

@Component({
  selector: 'app-mercado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mercado" id="mercado">
      <div class="container-section">
        <div class="mercado__header">
          <span class="mercado__subtitle">Valor de mercado</span>
          <h2 class="mercado__title">El precios del silicio</h2>
          <p class="mercado__description">
            La sílice amorfa de alta pureza tiene una demanda creciente en el mercado nacional e internacional, 
            con precios que varían según el grado de pureza y aplicaciones.
          </p>
        </div>
        
        <div class="mercado__grid">
          @for (item of marketData; track item.grade) {
            <div class="mercado__card" [class]="item.color">
              <div class="mercado__card-header">
                <h3 class="mercado__card-grade">{{ item.grade }}</h3>
                <span class="mercado__card-price">{{ item.priceRange }}</span>
              </div>
              <ul class="mercado__card-apps">
                @for (app of item.applications; track app) {
                  <li class="mercado__card-app">
                    <svg class="mercado__card-check" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    {{ app }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
        
        <div class="mercado__insight">
          <div class="mercado__insight-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <div class="mercado__insight-content">
            <p class="mercado__insight-title">El mercado global de sílice</p>
            <p class="mercado__insight-text">
              Se calcula en <strong>$18.000 millones USD</strong> para 2025, con una tasa de crecimiento 
              anual compuesta (CAGR) del <strong>8,5%</strong>. La sílice de origen agrícola 
              representa un segmento en expansión por su menor huella de carbono.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .mercado {
      @apply py-20 md:py-28 bg-gray-50;
      
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
      
      &__grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-8;
      }
      
      &__card {
        @apply bg-white rounded-xl p-8 shadow-lg;
        
        &-industrial {
          @apply border-l-4 border-blue-500;
        }
        
        &-especial {
          @apply border-l-4 border-purple-500;
        }
      }
      
      &__card-header {
        @apply mb-6;
      }
      
      &__card-grade {
        @apply text-2xl font-bold text-gray-900 mb-2;
      }
      
      &__card-price {
        @apply text-lg text-gray-600;
      }
      
      &__card-apps {
        @apply space-y-3;
      }
      
      &__card-app {
        @apply flex items-center gap-2 text-gray-600;
      }
      
      &__card-check {
        @apply w-5 h-5 text-green-500 flex-shrink-0;
      }
      
      &__insight {
        @apply mt-12 flex items-start gap-6 p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl;
      }
      
      &__insight-icon {
        @apply w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0;
        
        svg {
          @apply w-6 h-6 text-primary-600;
        }
      }
      
      &__insight-title {
        @apply font-bold text-gray-900 mb-2;
      }
      
      &__insight-text {
        @apply text-gray-700;
        
        strong {
          @apply text-primary-600;
        }
      }
    }
  `]
})
export class MercadoComponent implements OnInit {
  marketData: MarketData[] = [
    {
      grade: 'Grado Industrial',
      priceRange: '$8.400 - $21.000 COP/kg',
      applications: ['Construcción civil', 'Caucho y neumáticos', 'Catalizadores industriales', 'Filtros'],
      color: 'bg-blue-50'
    },
    {
      grade: 'Grado Especial',
      priceRange: '$42.000 - $210.000 COP/kg',
      applications: ['Electrónica', 'Cosmética premium', 'Alta tecnología', 'Baterías de litio'],
      color: 'bg-purple-50'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}
}