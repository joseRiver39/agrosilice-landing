import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatKg',
  standalone: true
})
export class FormatKgPipe implements PipeTransform {
  transform(value: number, decimals = 2): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0 kg';
    }
    
    if (value >= 1000) {
      const tons = value / 1000;
      return `${tons.toFixed(decimals)} ton`;
    } else if (value >= 1) {
      return `${value.toFixed(decimals)} kg`;
    } else if (value >= 0.001) {
      const grams = value * 1000;
      return `${grams.toFixed(decimals)} g`;
    } else {
      return `${(value * 1000000).toFixed(decimals)} mg`;
    }
  }
}