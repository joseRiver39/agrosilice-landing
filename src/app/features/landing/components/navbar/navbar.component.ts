import { Component, HostListener, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()" [class.menu-open]="menuOpen()">
      <div class="navbar__container">
        <!-- Logo -->
        <a href="#" class="navbar__logo" (click)="scrollToTop($event)">
          <svg class="navbar__logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
            <path d="M20 8C20 8 12 16 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 16 20 8 20 8Z" fill="currentColor"/>
            <path d="M15 22L20 18L25 22" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="navbar__logo-text">RiSil</span>
        </a>

        <!-- Desktop Navigation -->
        <div class="navbar__links">
          @for (link of navLinks; track link.href) {
            <a [href]="link.href" 
               class="navbar__link" 
               (click)="scrollTo($event, link.href)">
              {{ link.label }}
            </a>
          }
        </div>

        <!-- CTA Button -->
        <a href="#calculator" 
           class="navbar__cta"
           (click)="scrollTo($event, '#calculator')">
          Calcular mi potencial
        </a>

        <!-- Mobile Menu Button -->
        <button class="navbar__hamburger" 
                (click)="toggleMenu()"
                [attr.aria-expanded]="menuOpen()"
                aria-label="Toggle menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="navbar__mobile" [class.open]="menuOpen()">
        @for (link of navLinks; track link.href) {
          <a [href]="link.href" 
             class="navbar__mobile-link" 
             (click)="scrollTo($event, link.href); toggleMenu()">
            {{ link.label }}
          </a>
        }
        <a href="#calculator" 
           class="navbar__mobile-cta"
           (click)="scrollTo($event, '#calculator'); toggleMenu()">
          Calcular mi potencial
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      @apply fixed top-0 left-0 right-0 z-50 transition-all duration-300;
      @apply bg-white/95 backdrop-blur-sm;
      
      &.scrolled {
        @apply shadow-md;
      }
      
      &__container {
        @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
        @apply flex items-center justify-between h-16;
      }
      
      &__logo {
        @apply flex items-center gap-2 text-primary-600;
      }
      
      &__logo-icon {
        @apply w-8 h-8;
      }
      
      &__logo-text {
        @apply text-xl font-bold;
      }
      
      &__links {
        @apply hidden md:flex items-center gap-8;
      }
      
      &__link {
        @apply text-gray-700 hover:text-primary-600 font-medium transition-colors;
      }
      
      &__cta {
        @hidden md:flex;
        @apply bg-primary-500 text-white font-semibold px-4 py-2 rounded-lg;
        @apply transition-all duration-300 hover:bg-primary-600 hover:shadow-md;
      }
      
      &__hamburger {
        @apply md:hidden flex flex-col justify-center gap-1.5 w-8 h-8;
        @apply cursor-pointer;
        
        .hamburger-line {
          @apply w-6 h-0.5 bg-gray-700 transition-all duration-300;
        }
      }
      
      &.menu-open &__hamburger {
        .hamburger-line:nth-child(1) {
          @apply rotate-45 translate-y-1.5;
        }
        .hamburger-line:nth-child(2) {
          @apply opacity-0;
        }
        .hamburger-line:nth-child(3) {
          @apply -rotate-45 -translate-y-1.5;
        }
      }
      
      &__mobile {
        @apply md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg;
        @apply flex flex-col items-center gap-4 py-6 px-4;
        @apply transform -translate-y-full opacity-0 pointer-events-none;
        @apply transition-all duration-300;
        
        &.open {
          @apply translate-y-0 opacity-100 pointer-events-auto;
        }
      }
      
      &__mobile-link {
        @apply text-gray-700 hover:text-primary-600 font-medium py-2;
      }
      
      &__mobile-cta {
        @apply bg-primary-500 text-white font-semibold px-6 py-3 rounded-lg w-full text-center;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = signal(false);
  menuOpen = signal(false);
  
  navLinks: NavLink[] = [
    { label: 'Problema', href: '#problema' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Aplicaciones', href: '#aplicaciones' },
    { label: 'Calculadora', href: '#calculator' },
    { label: 'Mercado', href: '#mercado' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.menuOpen.set(false);
    }
  }

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.menuOpen.set(false);
    }
  }
}