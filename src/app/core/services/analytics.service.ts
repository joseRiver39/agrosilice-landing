import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private initialized = false;

  constructor(private router: Router) {
    this.initGtag();
  }

  private initGtag(): void {
    // Initialize dataLayer if not exists
    window.dataLayer = window.dataLayer || [];
    
    // Simple gtag implementation for development
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
      console.log('[GTag]', ...args);
    };
  }

  trackEvent(eventName: string, params?: Record<string, any>): void {
    if (!this.initialized) {
      this.initialized = true;
    }
    
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  }

  trackPageView(pagePath: string, pageTitle?: string): void {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title
    });
  }

  trackCalculatorUsage(residueType: string, amount: number, method: string): void {
    this.trackEvent('calculator_usage', {
      event_category: 'engagement',
      residue_type: residueType,
      amount_kg: amount,
      process_method: method
    });
  }

  trackSectionView(sectionName: string): void {
    this.trackEvent('section_view', {
      event_category: 'engagement',
      section: sectionName
    });
  }

  trackCtaClick(ctaName: string, section: string): void {
    this.trackEvent('cta_click', {
      event_category: 'engagement',
      cta_name: ctaName,
      section: section
    });
  }

  trackScrollDepth(depth: number): void {
    this.trackEvent('scroll_depth', {
      event_category: 'engagement',
      depth_percentage: depth
    });
  }
}