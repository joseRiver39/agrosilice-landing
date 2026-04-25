import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ProblemCard {
  id: number;
  title: string;
  description: string;
  image: string;
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
          <h2 class="problema__title">La quema, el ambiente la paga</h2>
          <p class="problema__description">
            Millones de toneladas de tamo de arroz se gestionan de forma ineficiente, 
            generando contaminación, multas y graves pérdidas económicas.
          </p>
        </div>
        
        <div class="problema__grid">
          @for (card of cards; track card.id; let i = $index) {
            <div class="problema__card" 
                 [class.visible]="isCardVisible(card.id)"
                 [style.--delay]="i * 150 + 'ms'">
              
              <div class="problema__card-image-container">
                <img [src]="card.image" [alt]="card.title" class="problema__card-image">
                <div class="problema__card-overlay"></div>
                <span class="problema__card-number">{{ card.id }}</span>
              </div>

              <div class="problema__card-content">
                <h3 class="problema__card-title">{{ card.title }}</h3>
                <p class="problema__card-description">{{ card.description }}</p>
                
                <div class="problema__card-impact">
                  <div class="problema__card-badge-row">
                    <span class="problema__card-badge" [class]="'problema__card-badge--' + card.badgeVariant">
                      {{ card.badge }}
                    </span>
                  </div>
                  <div class="problema__card-impact-box">
                    <svg class="problema__impact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span class="problema__card-impact-text">{{ card.impact }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        
        <div class="problema__highlight">
          <div class="problema__highlight-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="problema__highlight-text">
            <strong>Dato crítico:</strong> El 91% del tamo en Colombia se quema, desperdiciando un potencial económico inmenso y afectando la salud de las comunidades.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .problema {
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
      
      &__grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-8;
      }
      
      &__card {
        @apply bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100;
        @apply transition-all duration-700 opacity-0 translate-y-12;
        
        &.visible {
          @apply opacity-100 translate-y-0;
        }
        
        &:hover {
          @apply shadow-2xl transform -translate-y-2;
        }
      }

      &__card-image-container {
        @apply relative h-48 w-full overflow-hidden;
      }

      &__card-image {
        @apply w-full h-full object-cover transition-transform duration-700;
        .problema__card:hover & {
          @apply scale-110;
        }
      }

      &__card-overlay {
        @apply absolute inset-0 bg-gradient-to-t from-black/60 to-transparent;
      }

      &__card-number {
        @apply absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md;
        @apply flex items-center justify-center text-white font-bold border border-white/30;
      }
      
      &__card-content {
        @apply p-6;
      }
      
      &__card-title {
        @apply text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight;
      }
      
      &__card-description {
        @apply text-gray-600 text-sm mb-6 leading-relaxed;
      }
      
      &__card-impact {
        @apply pt-4 border-t border-gray-100;
      }

      &__card-badge-row {
        @apply mb-3;
      }
      
      &__card-badge {
        @apply inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider;
        
        &--danger { @apply bg-red-100 text-red-700; }
        &--warning { @apply bg-orange-100 text-orange-700; }
        &--info { @apply bg-blue-100 text-blue-700; }
      }

      &__card-impact-box {
        @apply flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100;
      }

      &__impact-icon {
        @apply w-5 h-5 text-red-500 flex-shrink-0;
      }
      
      &__card-impact-text {
        @apply text-gray-800 font-semibold text-xs md:text-sm;
      }
      
      &__highlight {
        @apply mt-16 flex items-center gap-6 p-8 bg-primary-50 rounded-2xl border-2 border-primary-100;
        @apply max-w-4xl mx-auto;
      }
      
      &__highlight-icon {
        @apply w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200;
        
        svg { @apply w-8 h-8 text-white; }
      }
      
      &__highlight-text {
        @apply text-gray-800 text-lg leading-snug;
        strong { @apply text-primary-700; }
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
      description: 'Práctica que libera CO₂, material particulado y destruye el potencial económico del residuo afectando la salud pública.',
      image: 'images/problema/quema.jpg',
      impact: 'Multas hasta $1.500.000 COP/ha',
      badge: 'IMPACTO AMBIENTAL CRÍTICO',
      badgeVariant: 'danger'
    },
    {
      id: 2,
      title: 'Disposición en rellenos',
      description: 'Genera altos costos de transporte y ocupa espacio valioso. El tamo no se descompone fácilmente por su alto contenido de sílice.',
      image: 'images/problema/relleno.jpg',
      impact: 'Costo $80.000 - $120.000 /ton',
      badge: 'GASTO OPERATIVO ELEVADO',
      badgeVariant: 'warning'
    },
    {
      id: 3,
      title: 'Abandono en campos',
      description: 'Dificulta labores agrícolas, atrae plagas y enfermedades que afectan la productividad del siguiente ciclo de cultivo.',
      image: 'images/problema/abandono.jpg',
      impact: 'Riesgo de plagas y enfermedades',
      badge: 'AMENAZA FITOSANITARIA',
      badgeVariant: 'danger'
    },
    {
      id: 4,
      title: 'Costos económicos',
      description: 'Gastos acumulados en transporte, mano de obra y multas que reducen drásticamente la rentabilidad del productor arrocero.',
      image: 'images/problema/costos.jpg',
      impact: 'Pérdida rentabilidad acumulada',
      badge: 'CARGA FINANCIERA',
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
      { threshold: 0.1 }
    );
    
    cards.forEach(card => observer.observe(card));
  }
}
