import { Component, signal, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Application {
  id: number;
  title: string;
  description: string;
  bullets: string[];
  image: string | null;
  emoji: string;
  color: string;
  borderColor: string;
  badgeColor: string;
}

@Component({
  selector: 'app-aplicaciones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="aplicaciones" id="aplicaciones">
      <div class="container-section">
        <div class="aplicaciones__header">
          <span class="aplicaciones__subtitle">Aplicaciones</span>
          <h2 class="aplicaciones__title">Industrias que se benefician de la sílice</h2>
          <p class="aplicaciones__description">
            La sílice amorfa de alta pureza extraída del tamo de arroz tiene un amplio espectro
            de aplicaciones industriales según el grado de pureza alcanzado.
          </p>
        </div>

        <div class="aplicaciones__grid">
          @for (app of applications; track app.id) {
            <div
              class="aplicaciones__card"
              [class.aplicaciones__card--expanded]="expandedCard() === app.id"
              [style.border-color]="expandedCard() === app.id ? app.borderColor : 'transparent'">

              <!-- Image area -->
              <div class="aplicaciones__card-image">
                @if (app.image) {
                  <img [src]="app.image" [alt]="app.title" class="aplicaciones__card-img" />
                } @else {
                  <div class="aplicaciones__card-emoji" [style.background]="app.color + '22'">
                    <span>{{ app.emoji }}</span>
                  </div>
                }
                <div class="aplicaciones__card-badge" [style.background]="app.badgeColor">
                  <span class="aplicaciones__card-number">{{ app.id }}</span>
                </div>
              </div>

              <!-- Content area -->
              <div class="aplicaciones__card-body">
                <h3 class="aplicaciones__card-title" [style.color]="app.color">
                  {{ app.title }}
                </h3>

                <button
                  class="aplicaciones__card-toggle-btn"
                  (click)="toggleExpand(app.id)"
                  [attr.aria-expanded]="expandedCard() === app.id">
                  <span class="aplicaciones__card-preview">{{ app.description }}</span>
                  <svg
                    class="aplicaciones__card-chevron"
                    [class.aplicaciones__card-chevron--open]="expandedCard() === app.id"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                @if (expandedCard() === app.id) {
                  <ul class="aplicaciones__card-bullets">
                    @for (bullet of app.bullets; track bullet) {
                      <li class="aplicaciones__card-bullet">
                        <span class="aplicaciones__bullet-dot" [style.background]="app.badgeColor"></span>
                        {{ bullet }}
                      </li>
                    }
                  </ul>
                }
              </div>

            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .aplicaciones {
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
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
      }

      &__card {
        @apply bg-white rounded-2xl shadow-md overflow-hidden border-2 border-transparent;
        @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;

        &--expanded {
          @apply shadow-xl -translate-y-1;
        }
      }

      &__card-image {
        @apply relative h-44 overflow-hidden bg-gray-100;
      }

      &__card-img {
        @apply w-full h-full object-cover transition-transform duration-500;

        .aplicaciones__card:hover & {
          @apply scale-105;
        }
      }

      &__card-emoji {
        @apply w-full h-full flex items-center justify-center;

        span {
          @apply text-7xl;
        }
      }

      &__card-badge {
        @apply absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md;
      }

      &__card-number {
        @apply text-white font-bold text-base;
      }

      &__card-body {
        @apply p-5;
      }

      &__card-title {
        @apply text-lg font-bold mb-3;
      }

      &__card-toggle-btn {
        @apply w-full text-left flex items-start justify-between gap-2 cursor-pointer;
        @apply bg-transparent border-none p-0;
      }

      &__card-preview {
        @apply text-gray-600 text-sm leading-relaxed flex-1;
      }

      &__card-chevron {
        @apply w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-300;

        &--open {
          @apply rotate-180;
        }
      }

      &__card-bullets {
        @apply mt-4 space-y-2 list-none p-0;
      }

      &__card-bullet {
        @apply flex items-start gap-2 text-sm text-gray-600;
      }

      &__bullet-dot {
        @apply w-2 h-2 rounded-full flex-shrink-0 mt-1.5;
      }
    }
  `]
})
export class AplicacionesComponent implements OnInit {
  expandedCard = signal<number | null>(null);

  applications: Application[] = [
    {
      id: 1,
      title: 'Industria de la Construcción',
      description: 'Aditivo para concretos de alto rendimiento, morteros y ladrillos refractarios.',
      bullets: [
        'Aditivo para concreto: Mejora durabilidad y trabajabilidad',
        'Morteros y revoques: Aumenta adherencia, reduce permeabilidad',
        'Ladrillos y cerámicos: Mejora propiedades mecánicas y térmicas',
        'Reduce costos hasta 30% vs sílice convencional'
      ],
      image: 'images/aplicaciones/construccion.png',
      emoji: '🏗️',
      color: '#1d4ed8',
      borderColor: '#3b82f6',
      badgeColor: '#1d4ed8'
    },
    {
      id: 2,
      title: 'Caucho y Neumáticos',
      description: 'Agente de refuerzo alternativo al negro de humo para neumáticos verdes.',
      bullets: [
        'Agente de refuerzo: Alternativa ecológica al negro de humo',
        'Neumáticos "verdes": Mayor resistencia a la rodadura',
        'Mejora tracción, resistencia al desgaste y durabilidad',
        'Reduce consumo de combustible hasta 20%'
      ],
      image: 'images/aplicaciones/caucho.png',
      emoji: '🔵',
      color: '#374151',
      borderColor: '#6b7280',
      badgeColor: '#374151'
    },
    {
      id: 3,
      title: 'Química y Catalizadores',
      description: 'Soporte de catalizadores y adsorbentes con área superficial de hasta 300 m²/g.',
      bullets: [
        'Soporte de catalizadores para procesos catalíticos',
        'Adsorbentes: Purificación de gases y líquidos',
        'Columnas de cromatografía de alta resolución',
        'Área superficial hasta 300 m²/g'
      ],
      image: 'images/aplicaciones/quimica.png',
      emoji: '🧪',
      color: '#15803d',
      borderColor: '#22c55e',
      badgeColor: '#15803d'
    },
    {
      id: 4,
      title: 'Cosmética y Cuidado Personal',
      description: 'Abrasivo suave, espesante y absorbente en cremas, pastas dentales y maquillaje.',
      bullets: [
        'Abrasivo suave en pastas dentales y exfoliantes',
        'Agente espesante en cremas, lociones y maquillaje',
        'Absorbente en polvos faciales y desodorantes',
        'Aprobado para uso cosmético por autoridades sanitarias'
      ],
      image: 'images/aplicaciones/cosmetica.png',
      emoji: '💄',
      color: '#be185d',
      borderColor: '#ec4899',
      badgeColor: '#be185d'
    },
    {
      id: 5,
      title: 'Industria Alimentaria',
      description: 'Antiaglomerante E-551, clarificante de bebidas y portador de aditivos.',
      bullets: [
        'Antiaglomerante (E-551): Sal, especias, leche en polvo',
        'Clarificante en producción de cervezas y jugos',
        'Portador de aromas y aditivos alimentarios',
        'Aprobado FDA para consumo humano'
      ],
      image: 'images/aplicaciones/alimentaria.png',
      emoji: '🌾',
      color: '#c2410c',
      borderColor: '#f97316',
      badgeColor: '#c2410c'
    },
    {
      id: 6,
      title: 'Aplicaciones Agrícolas',
      description: 'Mejorador de suelos y portador de agroquímicos con liberación controlada.',
      bullets: [
        'Mejorador de suelos: Aporta sílice disponible para plantas',
        'Portador de agroquímicos de liberación controlada',
        'Fertilizante de liberación lenta de alta eficiencia',
        'Aumenta eficiencia de fertilizantes hasta 40%'
      ],
      image: null,
      emoji: '🌱',
      color: '#065f46',
      borderColor: '#10b981',
      badgeColor: '#065f46'
    },
    {
      id: 7,
      title: 'Alta Tecnología',
      description: 'Electrónica, baterías de litio, celdas de combustible y semiconductores.',
      bullets: [
        'Nanomateriales para electrónica y sensores',
        'Ánodo en baterías de litio de próxima generación',
        'Materiales semiconductores y fotovoltaicos',
        'Requiere pureza >99% de SiO₂'
      ],
      image: null,
      emoji: '⚡',
      color: '#6d28d9',
      borderColor: '#8b5cf6',
      badgeColor: '#6d28d9'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  toggleExpand(id: number): void {
    this.expandedCard.set(this.expandedCard() === id ? null : id);
  }
}