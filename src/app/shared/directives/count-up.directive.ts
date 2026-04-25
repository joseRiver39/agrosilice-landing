import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() appCountUp: number | string = 0;
  @Input() duration = 2000;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() decimals = 0;
  @Input() startOnScroll = false;
  
  private observer: IntersectionObserver | null = null;
  private animationFrame: number | null = null;
  private hasAnimated = false;
  
  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.startOnScroll) {
      this.setupIntersectionObserver();
    } else if (isPlatformBrowser(this.platformId) && !this.startOnScroll) {
      this.startAnimation();
    }
  }
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
  
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.startAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );
    this.observer.observe(this.el.nativeElement);
  }
  
  private startAnimation(): void {
    if (this.hasAnimated) return;
    this.hasAnimated = true;
    
    const start = 0;
    const targetValue = typeof this.appCountUp === 'string' ? parseFloat(this.appCountUp) : this.appCountUp;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function: ease-out-cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (targetValue - start) * easeOut;
      
      this.el.nativeElement.textContent = 
        this.prefix + current.toFixed(this.decimals) + this.suffix;
      
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }
}