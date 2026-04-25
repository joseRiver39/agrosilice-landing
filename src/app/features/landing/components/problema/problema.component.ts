import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ProblemCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  impact: string;
  badge: string;
  badgeVariant: 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'app-problema',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="problema" id="problema">
      <div class="container-section">
        <div class="problema__header">
          <span class="problema__subtitle">El problema</span>
          <h2 class="problema__title">La quemas, el ambiente la paga</h2>
          <p class="problema__description">
            Millones de toneladas de tamo de arroz se queman anualmente en Colombia, 
            generando contaminación, multas y pérdidas económicas.
          </p>
        </div>
        
        <div class="problema__grid">
          @for (card of cards; track card.id; let i = $index) {
            <div class="problema__card" 
                 [class.visible]="isCardVisible(card.id)"
                 [style.--delay]="i * 100 + 'ms'">
              <div class="problema__card-icon" [innerHTML]="card.icon"></div>
              <h3 class="problema__card-title">{{ card.title }}</h3>
              <p class="problema__card-description">{{ card.description }}</p>
              <div class="problema__card-impact">
                <span class="problema__card-badge" [class]="'problema__card-badge--' + card.badgeVariant">
                  {{ card.badge }}
                </span>
                <span class="problema__card-impact-text">{{ card.impact }}</span>
              </div>
            </div>
          }
        </div>
        
        <div class="problema__highlight">
          <div class="problema__highlight-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <p class="problema__highlight-text">
            <strong>91%</strong> del tamo de arroz en Colombia se quema a cielo abierto, 
            contribuyendo al cambio climático y afectando la salud pública.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .problema {
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
        @apply grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8;
      }
      
      &__card {
        @apply bg-white rounded-xl p-8 shadow-md;
        @apply transition-all duration-500 opacity-0 translate-y-8;
        
        &.visible {
          @apply opacity-100 translate-y-0;
        }
        
        &:hover {
          @apply shadow-xl transform -translate-y-1;
        }
      }
      
      &__card-icon {
        @apply w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4;
        
        :deep(svg) {
          @apply w-8 h-8 text-red-500;
        }
      }
      
      &__card-title {
        @apply text-xl font-bold text-gray-900 mb-3;
      }
      
      &__card-description {
        @apply text-gray-600 mb-4;
      }
      
      &__card-impact {
        @apply pt-4 border-t border-gray-100;
      }
      
      &__card-badge {
        @apply inline-block px-3 py-1 rounded-full text-sm font-medium mb-2;
        
        &--danger {
          @apply bg-red-100 text-red-700;
        }
        
        &--warning {
          @apply bg-primary-100 text-primary-700;
        }
        
        &--info {
          @apply bg-blue-100 text-blue-700;
        }
      }
      
      &__card-impact-text {
        @apply text-gray-700 block text-sm;
      }
      
      &__highlight {
        @apply mt-12 flex items-center justify-center gap-4 p-6 bg-red-50 rounded-xl;
        @apply max-w-3xl mx-auto;
      }
      
      &__highlight-icon {
        @apply w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0;
        
        svg {
          @apply w-6 h-6 text-red-600;
        }
      }
      
      &__highlight-text {
        @apply text-gray-700 text-center;
        
        strong {
          @apply text-red-600;
        }
      }
    }
  `]
})
export class ProblemaComponent implements OnInit {
  visibleCards = new Set<number>();
  
  cards: ProblemCard[] = [
    {
      id: 1,
      title: 'Quema a cielo abierto',
      description: 'La práctica tradicional de quema genera emisiones de CO₂, material particulado y compuestos orgánicos volátiles.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>`,
      impact: 'Multas MADS hasta $1.500.000 COP/ha',
      badge: 'Alto impacto',
      badgeVariant: 'danger'
    },
    {
      id: 2,
      title: 'Disposición en rellenos',
      description: 'El transporte y disposición legal del residuo representa costos operativos significativos para las arroceras.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
      impact: '$80.000 - $120.000 COP/tonelada',
      badge: 'Costo operativo',
      badgeVariant: 'warning'
    },
    {
      id: 3,
      title: 'Abandono en campos',
      description: 'El tamo abandonado genera breeding grounds para plagas y enfermedades que afectan los cultivos del siguiente ciclo.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      impact: 'Pérdida 15-30% siguiente cosecha',
      badge: 'Riesgo fitosanitario',
      badgeVariant: 'danger'
    },
    {
      id: 4,
      title: 'Costos económicos acumulados',
      description: 'La sumatoria de transporte, mano de obra y potenciales multas representa una carga financiera significativa para los productores.',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2c.393 0 .77-.082 1.105-.236M12 20c-1.657 0-3-.895-3-2s1.343-2 3-2c.393 0 .77.082 1.105.236M6 12a6 6 0 1112 0 6 6 0 01-12 0zm0 0v6m6-6h6"/></svg>`,
      impact: '+$500.000 COP/ha/año',
      badge: 'Pérdida económica',
      badgeVariant: 'danger'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setupIntersectionObserver(), 100);
    }
  }

  isCardVisible(id: number): boolean {
    return this.visibleCards.has(id);
  }

  private setupIntersectionObserver(): void {
    const cards = document.querySelectorAll('.problema__card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target as Element);
            if (!this.visibleCards.has(index + 1)) {
              this.visibleCards.add(index + 1);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    cards.forEach(card => observer.observe(card));
  }
}
