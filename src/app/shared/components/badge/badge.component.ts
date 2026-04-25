import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [class]="'badge--' + variant">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .badge {
      @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
      
      &--success {
        @apply bg-accent-100 text-accent-800;
      }
      
      &--warning {
        @apply bg-primary-100 text-primary-800;
      }
      
      &--danger {
        @apply bg-red-100 text-red-800;
      }
      
      &--info {
        @apply bg-blue-100 text-blue-800;
      }
      
      &--neutral {
        @apply bg-gray-100 text-gray-800;
      }
    }
  `]
})
export class BadgeComponent {
  @Input() variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
}