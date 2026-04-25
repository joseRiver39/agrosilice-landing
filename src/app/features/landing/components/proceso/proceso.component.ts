import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  parameters: string;
  icon: string;
}

@Component({
  selector: 'app-proceso',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="proceso" id="proceso">
      <div class="container-section">
        <div class="proceso__header">
          <span class="proceso__subtitle">El proceso</span>
          <h2 class="proceso__title">Del campo al producto refinado</h2>
          <p class="proceso__description">
            Transformamos el residuo agrícola en sílice amorfa de alta pureza mediante 
            un proceso térmico controlado y sostenible.
          </p>
        </div>
        
        <!-- Desktop Timeline -->
        <div class="proceso__timeline hidden md:block">
          <div class="proceso__line"></div>
          @for (step of steps; track step.number; let i = $index) {
            <div class="proceso__step" [class.proceso__step--left]="i % 2 === 0" [class.proceso__step--right]="i % 2 !== 0">
              <div class="proceso__step-content">
                <div class="proceso__step-number">{{ step.number }}</div>
                <h3 class="proceso__step-title">{{ step.title }}</h3>
                <p class="proceso__step-description">{{ step.description }}</p>
                <div class="proceso__step-params">{{ step.parameters }}</div>
              </div>
              <div class="proceso__step-icon" [innerHTML]="step.icon"></div>
            </div>
          }
        </div>
        
        <!-- Mobile Timeline -->
        <div class="proceso__timeline-mobile md:hidden">
          @for (step of steps; track step.number; let i = $index) {
            <div class="proceso__step-mobile">
              <div class="proceso__step-mobile-line">
                <div class="proceso__step-mobile-dot"></div>
              </div>
              <div class="proceso__step-mobile-content">
                <div class="proceso__step-number">{{ step.number }}</div>
                <h3 class="proceso__step-title">{{ step.title }}</h3>
                <p class="proceso__step-description">{{ step.description }}</p>
                <div class="proceso__step-params">{{ step.parameters }}</div>
              </div>
            </div>
          }
        </div>
        
        <div class="proceso__cta">
          <a href="#calculator" class="btn-primary" (click)="scrollTo($event, '#calculator')">
            Calcula tu rendimiento
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .proceso {
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
      
      &__timeline {
        @apply relative;
      }
      
      &__line {
        @apply absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-accent-400 to-accent-600;
        @apply transform -translate-x-1/2;
      }
      
      &__step {
        @apply relative flex items-center mb-12;
        
        &--left {
          @apply pr-[50%] justify-end;
        }
        
        &--right {
          @apply pl-[50%] justify-start;
        }
      }
      
      &__step-content {
        @apply bg-white rounded-xl p-6 shadow-lg max-w-md;
        @apply relative;
      }
      
      &__step-number {
        @apply absolute top-0 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center;
        @apply text-xl;
      }
      
      &--left &__step-number {
        @apply -right-5;
      }
      
      &--right &__step-number {
        @apply -left-5;
      }
      
      &__step-title {
        @apply text-xl font-bold text-gray-900 mb-2 mt-2;
      }
      
      &__step-description {
        @apply text-gray-600 text-sm mb-3;
      }
      
      &__step-params {
        @apply text-sm text-accent-600 font-medium bg-accent-50 px-3 py-1 rounded;
      }
      
      &__step-icon {
        @apply absolute w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center;
        @apply text-primary-600;
        
        :deep(svg) {
          @apply w-8 h-8;
        }
      }
      
      &--left &__step-icon {
        @apply left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2;
      }
      
      &--right &__step-icon {
        @apply left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2;
      }
      
      &__timeline-mobile {
        @apply relative ml-6;
      }
      
      &__step-mobile {
        @apply flex gap-4 mb-8;
      }
      
      &__step-mobile-line {
        @apply relative flex flex-col items-center;
      }
      
      &__step-mobile-dot {
        @apply w-10 h-10 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center;
        @apply text-xl z-10 relative bg-primary-500 text-white;
      }
      
      &__step-mobile-content {
        @apply flex-1 bg-gray-50 rounded-xl p-4;
      }
      
      &__cta {
        @apply text-center mt-12;
      }
    }
  `]
})
export class ProcesoComponent implements OnInit {
  steps: ProcessStep[] = [
    {
      number: 1,
      title: 'Recolección',
      description: 'Recolección del tamo postcosecha directamente del campo.',
      parameters: 'Humedad < 15%',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>`
    },
    {
      number: 2,
      title: 'Pretratamiento',
      description: 'Tratamiento químico para eliminar materia orgánica y metales.',
      parameters: 'HCl 0,1M o HNO3 0,2M | 2-4h',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10V5L8 4z"/></svg>`
    },
    {
      number: 3,
      title: 'Combustión',
      description: 'Calcinación controlada para obtener ceniza rica en sílice.',
      parameters: '500-700°C | 2-3h',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>`
    },
    {
      number: 4,
      title: 'Generación de ceniza',
      description: 'Obtención de ceniza de sílice como producto intermedio.',
      parameters: '13-29% rendimiento',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
    },
    {
      number: 5,
      title: 'Extracción',
      description: 'Purificación y ajuste de pureza del producto.',
      parameters: 'Lavado | Secado | Tamizado',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 8h.01"/></svg>`
    },
    {
      number: 6,
      title: 'Producto final',
      description: 'Sílice amorfa de alta pureza lista para usar.',
      parameters: '87-99,5% Pureza',
      icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}