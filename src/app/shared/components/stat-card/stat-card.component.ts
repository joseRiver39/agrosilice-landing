import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card" [class]="'stat-card--' + variant">
      @if (icon) {
        <div class="stat-card__icon" [innerHTML]="icon"></div>
      }
      <div class="stat-card__value">
        {{ prefix }}{{ displayValue }}{{ suffix }}
      </div>
      <div class="stat-card__label">{{ label }}</div>
      @if (description) {
        <div class="stat-card__description">{{ description }}</div>
      }
    </div>
  `,
  styles: [`
    .stat-card {
      @apply bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg;
      
      &--primary {
        @apply bg-gradient-to-br from-primary-500 to-primary-600 text-white;
        .stat-card__icon { @apply bg-white/20; }
      }
      
      &--accent {
        @apply bg-gradient-to-br from-accent-500 to-accent-600 text-white;
        .stat-card__icon { @apply bg-white/20; }
      }
      
      &--default {
        @apply border border-gray-100;
      }
      
      &__icon {
        @apply w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center;
        @apply bg-primary-100 text-primary-600;
      }
      
      &__value {
        @apply text-3xl md:text-4xl font-bold mb-2;
      }
      
      &__label {
        @apply font-semibold text-gray-700 mb-1;
      }
      
      &__description {
        @apply text-sm text-gray-500;
      }
    }
  `]
})
export class StatCardComponent implements OnInit, OnChanges {
  @Input() value = 0;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() label = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() variant: 'primary' | 'accent' | 'default' = 'default';
  
  displayValue = 0;
  private animationFrame: number | null = null;
  
  ngOnInit(): void {
    this.displayValue = this.value;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue !== undefined) {
      this.animateValue(changes['value'].currentValue);
    }
  }
  
  private animateValue(target: number): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      this.displayValue = Math.floor(start + (target - start) * easeOut);
      
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }
}