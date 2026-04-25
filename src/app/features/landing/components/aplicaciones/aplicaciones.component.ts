import { Component, signal, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Application {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-aplicaciones',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ],
  template: `
    <section class="aplicaciones" id="aplicaciones">
      <div class="container-section">
        <div class="aplicaciones__header">
          <span class="aplicaciones__subtitle">Aplicaciones</span>
          <h2 class="aplicaciones__title">Industrias que se benef dúvosea de la sílice</h2>
          <p class="aplicaciones__description">
            La sílice amorfa de alta pureza tiene múltiples aplicaciones industriales 
            que varían según el grado de pureza alcanzado.
          </p>
        </div>
        
        <div class="aplicaciones__grid">
          @for (app of applications; track app.id) {
            <button 
              class="aplicaciones__card"
              [class]="app.bgColor"
              (click)="toggleexpand(app.id)"
              [disabled]="expandedCard() !== null && expandedCard() !== app.id">
              <div class="aplicaciones__card-icon" [innerHTML]="app.icon"></div>
              <h3 class="aplicaciones__card-title">{{ app.title }}</h3>
              <p class="aplicaciones__card-description" [class.expanded]="expandedCard() === app.id">
                {{ app.description }}
              </p>
              <div class="aplicaciones__card-toggle" [class.rotated]="expandedCard() === app.id">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>
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
        @apply relative bg-white rounded-xl p-6 text-left shadow-md cursor-pointer;
        @apply transition-all duration-300;
        @apply hover:shadow-xl;
        
        &:disabled {
          @apply opacity-50 pointer-events-none;
        }
      }
      
      &__card-icon {
        @apply w-12 h-12 rounded-lg flex items-center justify-center mb-4;
        
        :deep(svg) {
          @apply w-8 h-8;
        }
      }
      
      &__card-title {
        @apply text-lg font-bold text-gray-900 mb-2;
      }
      
      &__card-description {
        @apply text-gray-600 text-sm overflow-hidden max-h-0 opacity-0 transition-all duration-300;
        
        &.expanded {
          @apply max-h-40 opacity-100 mt-2;
        }
      }
      
      &__card-toggle {
        @apply absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center;
        @apply text-gray-400 transition-transform duration-300;
        
        &.rotated {
          @apply rotate-180;
        }
      }
    }
  `]
})
export class AplicacionesComponent implements OnInit {
  expandedCard = signal<number | null>(null);
  
  applications: Application[] = [
    {
      id: 1,
      title: 'Construcción',
      description: 'Hormigones de alto rendimiento, morteros, ladrillos refractarios y materiales compuestos. Reduce costos hasta 30% vs sílice convencional.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4h1m2-6h3m-3 4h3m-6 4h.01M9 21h6m-6-4h.01M9 21v-4"/></svg>`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Caucho y Neumáticos',
      description: 'Agente de refuerzo de alta dispersión para neumáticos verdes. Mejora resistencia al desgaste y eficiencia energética.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.195-1.264.762-2.425 1.622-3.293A7.962 7.962 0 0112 4c1.657 0 3.219.456 4.542 1.237.86.868 1.427 2.03 1.622 3.294M10.325 4.317c.195 1.264.762 2.425 1.622 3.293A7.962 7.962 0 0112 4c-1.657 0-3.219.456-4.542 1.237-.86.868-1.427 2.03-1.622 3.294m0 0l.352 3.624a2 2 0 001.943 1.592h3.998a2 2 0 001.943-1.592l.352-3.624m-6.25 6.25h6.5a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-6.5a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5z"/></svg>`,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 3,
      title: 'Química y Catalizadores',
      description: 'Soporte de catalizadores, adsorbentes y columnas de cromatografía. Área superficial hasta 300 m²/g.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10V5L8 4z"/></svg>`,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      title: 'Cosmética',
      description: 'Abrasivo suave, espesante y absorbente en cremas, pastas dentales y productos de cuidado personal.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>`,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 5,
      title: 'Alimentaria',
      description: 'Antiaglomerante (E-551), clarificante de bebidas y portador de aditivos. Aprobado FDA para consumo humano.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M9 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0"/></svg>`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 6,
      title: 'Agricultura',
      description: 'Mejorador de suelos, portador controlado de agroquímicos y fertilizante de liberación lenta. Aumenta eficiencia hasta 40%.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 7,
      title: 'Alta Tecnología',
      description: 'Electróníónica, baterías de litio, celdas de combustible y materiales semiconductores. Pureza >99% requerida.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  toggleexpand(id: number): void {
    if (this.expandedCard() === id) {
      this.expandedCard.set(null);
    } else {
      this.expandedCard.set(id);
    }
  }
}