import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__top">
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
          
          <div class="footer__links">
            <div class="footer__column">
              <h4 class="footer__column-title">Navegación</h4>
              <ul class="footer__list">
                <li><a href="#problema">El Problema</a></li>
                <li><a href="#proceso">El Proceso</a></li>
                <li><a href="#aplicaciones">Aplicaciones</a></li>
                <li><a href="#calculator">Calculadora</a></li>
              </ul>
            </div>
            
            <div class="footer__column">
              <h4 class="footer__column-title">Contacto</h4>
              <ul class="footer__list">
                <li>contacto at risil.co</li>
                <li>+57 (1) 234 5678</li>
                <li>Bogotá, Colombia</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer__bottom">
          <p class="footer__copyright">
            © 2024 RiSil. Todos los derechos reservados. | 
            <a href="#">Política de privacidad</a> | 
            <a href="#">Términos de uso</a>
          </p>
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
      
      &__top {
        @apply grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-gray-800;
      }
      
      &__brand {
        @apply max-w-sm;
      }
      
      &__logo {
        @apply flex items-center gap-2 text-primary-500 mb-4;
      }
      
      &__logo-icon {
        @apply w-8 h-8;
      }
      
      &__logo-text {
        @apply text-2xl font-bold;
      }
      
      &__tagline {
        @apply text-gray-400;
      }
      
      &__links {
        @apply grid grid-cols-2 gap-8;
      }
      
      &__column-title {
        @apply font-semibold mb-4;
      }
      
      &__list {
        @apply space-y-2 text-gray-400;
        
        a {
          @apply hover:text-primary-500 transition-colors;
        }
      }
      
      &__bottom {
        @apply pt-8 text-center text-gray-500 text-sm;
      }
      
      &__copyright {
        a {
          @apply hover:text-primary-500 transition-colors;
        }
      }
    }
  `]
})
export class FooterComponent {}