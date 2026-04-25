import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-biorrefineria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="biorrefineria" id="biorrefineria">
      <div class="container-section">
        <div class="biorrefineria__header">
          <span class="biorrefineria__subtitle">Economía circular</span>
          <h2 class="biorrefineria__title">Biorrefinería de arroz</h2>
          <p class="biorrefineria__description">
            Transformamos un residuo problema en oportunidades económicas, ambientales y sociales 
            mediante procesos sostenibles de economía circular.
          </p>
        </div>
        
        <div class="biorrefineria__benefits">
          <div class="biorrefineria__benefit">
            <div class="biorrefineria__benefit-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 5.519A8.002 8.002 0 0114.945 11H17a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M3.055 11a8.003 8.003 0 014.945-7.945M3.055 11a8.003 8.003 0 017.945-4.945M3.055 11h4.945"/>
              </svg>
            </div>
            <h3 class="biorrefineria__benefit-title">Reducción de emisiones</h3>
            <p class="biorrefineria__benefit-text">
              Dejas de emitir hasta 3,5 toneladas de CO₂ equivalente por hectárea procesada.
            </p>
          </div>
          
          <div class="biorrefineria__benefit">
            <div class="biorrefineria__benefit-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2c.393 0 .77-.082 1.105-.236M12 20c-1.657 0-3-.895-3-2s1.343-2 3-2c.393 0 .77.082 1.105.236M6 12a6 6 0 1112 0 6 6 0 01-12 0z"/>
              </svg>
            </div>
            <h3 class="biorrefineria__benefit-title">Ingresos adicionales</h3>
            <p class="biorrefineria__benefit-text">
              Genera hasta $200.000 COP por tonelada de residuo transformado.
            </p>
          </div>
          
          <div class="biorrefineria__benefit">
            <div class="biorrefineria__benefit-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="biorrefineria__benefit-title">Empleo local</h3>
            <p class="biorrefineria__benefit-text">
              Crea hasta 15 empleos directos por cada 1.000 toneladas procesadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .biorrefineria {
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
      
      &__benefits {
        @apply grid grid-cols-1 md:grid-cols-3 gap-8;
      }
      
      &__benefit {
        @apply text-center p-8 bg-gray-50 rounded-xl;
      }
      
      &__benefit-icon {
        @apply w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center;
        
        svg {
          @apply w-8 h-8 text-primary-600;
        }
      }
      
      &__benefit-title {
        @apply text-xl font-bold text-gray-900 mb-3;
      }
      
      &__benefit-text {
        @apply text-gray-600;
      }
    }
  `]
})
export class BiorrefineriaComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}
}