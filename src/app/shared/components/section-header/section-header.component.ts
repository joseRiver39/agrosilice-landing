import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-12">
      @if (subtitle) {
        <p class="text-accent-600 font-medium mb-2 tracking-wide uppercase text-sm">{{ subtitle }}</p>
      }
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {{ title }}
      </h2>
      @if (description) {
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">{{ description }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SectionHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
}