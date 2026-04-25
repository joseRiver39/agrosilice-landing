import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ProblemaComponent } from './components/problema/problema.component';
import { ProcesoComponent } from './components/proceso/proceso.component';
import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { SilicaCalculatorComponent } from './components/silica-calculator/silica-calculator.component';
import { MercadoComponent } from './components/mercado/mercado.component';
import { BiorrefineriaComponent } from './components/biorrefineria/biorrefineria.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    ProblemaComponent,
    ProcesoComponent,
    AplicacionesComponent,
    SilicaCalculatorComponent,
    MercadoComponent,
    BiorrefineriaComponent
  ],
  template: `
    <app-hero />
    <app-problema />
    <app-proceso />
    <app-aplicaciones />
    <app-silica-calculator />
    <app-mercado />
    <app-biorrefineria />
    <!-- <app-contacto /> -->
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LandingComponent {}