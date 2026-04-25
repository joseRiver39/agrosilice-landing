import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__content">

          <!-- 1. RiSil -->
          <div class="footer__brand">
            <div class="footer__logo">
              <svg class="footer__logo-icon" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
                <path d="M20 8C20 8 12 16 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 16 20 8 20 8Z" fill="currentColor"/>
                <path d="M15 22L20 18L25 22" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span class="footer__logo-text">RiSil</span>
            </div>
            <p class="footer__tagline">
              Transformando residuos agrícolas en oportunidades económicas y ambientales.
            </p>
          </div>

          <!-- 2. UNAD -->
          <div class="footer__institution">
            <img src="images/unad_logo.png" alt="Logo UNAD" class="footer__unad-logo"
                 onerror="this.style.display='none'">
          </div>

          <!-- 3. Autor -->
          <div class="footer__author">
            <span class="footer__author-label">Desarrollado por:</span>
            <span class="footer__author-name">Jose Rivera</span>
          </div>

        </div>

        <div class="footer__bottom">
          <p class="footer__copyright">© 2026 RiSil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      @apply bg-gray-900 text-white py-12;

      &__container {
        @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
      }

      &__content {
        @apply flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8 pb-12 border-b border-gray-800 text-center md:text-left;
      }

      &__brand {
        @apply flex flex-col items-center md:items-start gap-3 max-w-xs;
      }

      &__logo {
        @apply flex items-center gap-2 text-primary-500;
      }

      &__logo-icon {
        @apply w-8 h-8;
      }

      &__logo-text {
        @apply text-2xl font-bold;
      }

      &__tagline {
        @apply text-gray-400 text-sm leading-relaxed;
      }

      &__institution {
        @apply flex flex-col items-center py-4 md:py-0;
      }

      &__unad-logo {
        @apply h-16 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity;
      }

      &__author {
        @apply flex flex-col items-center md:items-end gap-1;
      }

      &__author-label {
        @apply text-xs text-gray-500 uppercase tracking-widest;
      }

      &__author-name {
        @apply text-primary-400 font-semibold text-base;
      }

      &__bottom {
        @apply pt-8 text-center text-gray-500 text-sm;
      }
    }
  `]
})
export class FooterComponent {}