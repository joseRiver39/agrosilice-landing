import { Component, Inject, PLATFORM_ID, OnInit, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contacto" id="contacto">
      <div class="container-section">
        <div class="contacto__header">
          <span class="contacto__subtitle">Contacto</span>
          <h2 class="contacto__title">Hablemos de tu proyecto</h2>
          <p class="contacto__description">
            ¿Tienes tamo de arroz que transforman? ¿Quieres saber más sobre el proceso? 
            Escríbenos y te respondemos en menos de 24 horas.
          </p>
        </div>
        
        <div class="contacto__content">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contacto__form">
            <div class="contacto__field">
              <label for="name" class="contacto__label">Nombre completo *</label>
              <input 
                type="text" 
                id="name"
                formControlName="name"
                class="contacto__input"
                placeholder="Juan Pérez">
              @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                <span class="contacto__error">Nombre requerido</span>
              }
            </div>
            
            <div class="contacto__field">
              <label for="email" class="contacto__label">Correo electrónico *</label>
              <input 
                type="email" 
                id="email"
                formControlName="email"
                class="contacto__input"
                placeholder="juan@ejemplo.com">
              @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                <span class="contacto__error">Correo válido requerido</span>
              }
            </div>
            
            <div class="contacto__field">
              <label for="phone" class="contacto__label">Teléfono</label>
              <input 
                type="tel" 
                id="phone"
                formControlName="phone"
                class="contacto__input"
                placeholder="+57 300 123 4567">
            </div>
            
            <div class="contacto__field">
              <label for="company" class="contacto__label">Empresa / Finca</label>
              <input 
                type="text" 
                id="company"
                formControlName="company"
                class="contacto__input"
                placeholder="Finca La Esperanza">
            </div>
            
            <div class="contacto__field">
              <label for="message" class="contacto__label">Mensaje *</label>
              <textarea 
                id="message"
                formControlName="message"
                class="contacto__textarea"
                placeholder="¿Cuántas toneladas de tamo tienes disponibles?"
                rows="4"></textarea>
              @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                <span class="contacto__error">Mensaje requerido</span>
              }
            </div>
            
            <button 
              type="submit" 
              class="contacto__submit"
              [disabled]="contactForm.invalid || isSubmitting()">
              @if (isSubmitting()) {
                <span class="contacto__spinner"></span>
                Enviando...
              } @else {
                Enviar mensaje
              }
            </button>
            
            @if (submitted()) {
              <div class="contacto__success">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                ¡Mensaje enviado! Te contactaremos pronto.
              </div>
            }
          </form>
          
          <div class="contacto__info">
            <div class="contacto__info-card">
              <div class="contacto__info-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-5 9v-2m0 0V5a2 2 0 012-2h2M5 19a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </div>
              <div>
                <h4 class="contacto__info-title">Email</h4>
                <p class="contacto__info-text">contacto at risil.co</p>
              </div>
            </div>
            
            <div class="contacto__info-card">
              <div class="contacto__info-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.776 21 3 14.224 3 7V5z"/>
                </svg>
              </div>
              <div>
                <h4 class="contacto__info-title">Teléfono</h4>
                <p class="contacto__info-text">+57 (1) 234 5678</p>
              </div>
            </div>
            
            <div class="contacto__info-card">
              <div class="contacto__info-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="contacto__info-title">Ubicación</h4>
                <p class="contacto__info-text">Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contacto {
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
      
      &__content {
        @apply grid grid-cols-1 lg:grid-cols-2 gap-12;
      }
      
      &__form {
        @apply bg-white rounded-xl p-8 shadow-lg;
      }
      
      &__field {
        @apply mb-6;
      }
      
      &__label {
        @apply block text-gray-700 font-medium mb-2;
      }
      
      &__input,
      &__textarea {
        @apply w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200;
        @apply outline-none transition-all;
      }
      
      &__error {
        @apply text-red-500 text-sm mt-1;
      }
      
      &__submit {
        @apply w-full bg-primary-500 text-white font-semibold px-8 py-4 rounded-lg;
        @apply transition-all duration-300 hover:bg-primary-600 hover:shadow-lg;
        @apply disabled:opacity-50 disabled:cursor-not-allowed;
      }
      
      &__spinner {
        @apply inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2;
      }
      
      &__success {
        @apply mt-4 flex items-center gap-2 text-green-600 p-4 bg-green-50 rounded-lg;
        
        svg {
          @apply w-5 h-5;
        }
      }
      
      &__info {
        @apply space-y-6;
      }
      
      &__info-card {
        @apply flex items-center gap-4 bg-white rounded-xl p-6 shadow-md;
      }
      
      &__info-icon {
        @apply w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0;
        
        svg {
          @apply w-6 h-6 text-primary-600;
        }
      }
      
      &__info-title {
        @apply font-semibold text-gray-900 mb-1;
      }
      
      &__info-text {
        @apply text-gray-600;
      }
    }
  `]
})
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = signal(false);
  submitted = signal(false);
  
  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
        this.contactForm.reset();
        
        setTimeout(() => this.submitted.set(false), 5000);
      }, 1500);
    }
  }
}