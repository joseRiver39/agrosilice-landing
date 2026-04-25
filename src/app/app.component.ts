import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/landing/components/navbar/navbar.component';
import { HeroComponent } from './features/landing/components/hero/hero.component';
import { ProblemaComponent } from './features/landing/components/problema/problema.component';
import { ProcesoComponent } from './features/landing/components/proceso/proceso.component';
import { AplicacionesComponent } from './features/landing/components/aplicaciones/aplicaciones.component';
import { SilicaCalculatorComponent } from './features/landing/components/silica-calculator/silica-calculator.component';
import { MercadoComponent } from './features/landing/components/mercado/mercado.component';
import { BiorrefineriaComponent } from './features/landing/components/biorrefineria/biorrefineria.component';
import { ContactoComponent } from './features/landing/components/contacto/contacto.component';
import { FooterComponent } from './features/landing/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    ProblemaComponent,
    ProcesoComponent,
    AplicacionesComponent,
    SilicaCalculatorComponent,
    MercadoComponent,
    BiorrefineriaComponent,
    ContactoComponent,
    FooterComponent
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-problema />
      <app-proceso />
      <app-aplicaciones />
      <app-silica-calculator />
      <app-mercado />
      <app-biorrefineria />
      <app-contacto />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {}