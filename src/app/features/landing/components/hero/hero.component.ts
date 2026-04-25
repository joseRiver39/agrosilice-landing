import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, CountUpDirective],
  template: `
    <section class="hero" id="hero">
      <canvas #particleCanvas class="hero__canvas"></canvas>
      
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          Innovacion Sostenible
        </div>
        
        <h1 class="hero__title">
          Convierte el tamo de arroz en 
          <span class="hero__title-highlight">oro blanco</span>
        </h1>
        <p class="hero__subtitle">
          Cada tonelada de tamo que quemas representa hasta 
          <strong>$200.000 COP</strong> en pérdidas. 
          Descubre cómo transformarlo en sílice amorfa de alta pureza.
        </p>
        
        <div class="hero__cta">
          <a href="#proceso" class="hero__cta-primary" (click)="scrollTo($event, '#proceso')">
            Ver el proceso
            <svg class="hero__cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </a>
          <a href="#calculator" class="hero__cta-secondary" (click)="scrollTo($event, '#calculator')">
            Calcular mi potencial
          </a>
        </div>
        
        <!-- Stats -->
        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-value" 
                  appCountUp 
                  [appCountUp]="2800000" 
                  [prefix]="''" 
                  [suffix]="''"
                  [decimals]="0"
                  [startOnScroll]="true">
              0
            </span>
            <span class="hero__stat-label">Toneladas de tamo/año en Colombia</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-value" 
                  appCountUp 
                  [appCountUp]="200000" 
                  [prefix]="'$'" 
                  [suffix]="' COP/kg'"
                  [decimals]="0"
                  [startOnScroll]="true">
              $0
            </span>
            <span class="hero__stat-label">Precio maximo sílice especial</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-value" 
                  appCountUp 
                  [appCountUp]="99.5" 
                  [prefix]="''" 
                  [suffix]="'%'"
                  [decimals]="1"
                  [startOnScroll]="true">
              0%
            </span>
            <span class="hero__stat-label">Pureza alcanzable</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      @apply relative min-h-screen flex items-center justify-center;
      @apply bg-gradient-to-b from-gray-50 to-white overflow-hidden;
      padding-top: 64px;
      
      &__canvas {
        @apply absolute inset-0 w-full h-full;
        @apply pointer-events-none;
      }
      
      &__content {
        @apply relative z-10 container-section text-center max-w-5xl;
      }
      
      &__badge {
        @apply inline-flex items-center gap-2 px-4 py-2 rounded-full;
        @apply bg-primary-100 text-primary-700 font-medium text-sm mb-6;
      }
      
      &__badge-dot {
        @apply w-2 h-2 rounded-full bg-primary-500 animate-pulse;
      }
      
      &__title {
        @apply text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6;
        @apply leading-tight;
      }
      
      &__title-highlight {
        @apply text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500;
      }
      
      &__subtitle {
        @apply text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto;
      }
      
      &__cta {
        @apply flex flex-col sm:flex-row items-center justify-center gap-4 mb-16;
      }
      
      &__cta-primary {
        @apply flex items-center gap-2 bg-primary-500 text-white font-semibold px-8 py-4 rounded-lg;
        @apply transition-all duration-300 hover:bg-primary-600 hover:shadow-lg hover:scale-105;
      }
      
      &__cta-secondary {
        @apply bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg;
        @apply border-2 border-primary-500 transition-all duration-300 hover:bg-primary-50 hover:shadow-md;
      }
      
      &__cta-icon {
        @apply w-5 h-5;
      }
      
      &__stats {
        @apply grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8;
      }
      
      &__stat {
        @apply bg-white rounded-xl p-6 shadow-md;
        @apply transition-all duration-300 hover:shadow-xl;
      }
      
      &__stat-value {
        @apply block text-3xl md:text-4xl font-bold text-primary-600 mb-2;
      }
      
      &__stat-label {
        @apply text-gray-600 text-sm;
      }
    }
  `]
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private animationFrame: number | null = null;
  private particles: Particle[] = [];
  private ctx: CanvasRenderingContext2D | null = null;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvas();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    this.particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    
    this.animate();
  }

  private animate(): void {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Wrap around
      if (p.x < 0) p.x = this.canvasRef.nativeElement.width;
      if (p.x > this.canvasRef.nativeElement.width) p.x = 0;
      if (p.y < 0) p.y = this.canvasRef.nativeElement.height;
      if (p.y > this.canvasRef.nativeElement.height) p.y = 0;
      
      // Draw
      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx!.fillStyle = `rgba(234, 179, 8, ${p.opacity})`;
      this.ctx!.fill();
    });
    
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

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

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}