import { Injectable, computed, signal } from '@angular/core';
import { 
  CalculationResult, 
  ProcessInfo, 
  ResidueInfo, 
  ResidueType, 
  ProcessMethod,
  MarketValue
} from '../models/silica-calculation.model';

@Injectable({
  providedIn: 'root'
})
export class SilicaCalculatorService {
  // Exchange rate: 1 USD = 4,200 COP
  private readonly USD_TO_COP = 4200;
  
  // Reference: 3,000 kg tamo per hectare
  private readonly KG_TAMO_PER_HECTARE = 3000;
  
  // MADS fine: 1,500,000 COP per hectare burned
  private readonly FINE_PER_HECTARE = 1500000;

  readonly residueTypes: ResidueInfo[] = [
    {
      type: 'tamo',
      name: 'Tamo / Rastrojo',
      description: 'Restos de la planta de arroz después de la cosecha',
      silicaMin: 0.05,
      silicaMax: 0.154,
      silicaMedia: 0.102
    },
    {
      type: 'cascarilla',
      name: 'Cascarilla',
      description: 'Cáscara exterior del grano de arroz',
      silicaMin: 0.15,
      silicaMax: 0.245,
      silicaMedia: 0.1975
    },
    {
      type: 'mezcla',
      name: 'Mezcla (Tamo + Cascarilla)',
      description: 'Combinación de ambos residuos',
      silicaMin: 0.10,
      silicaMax: 0.20,
      silicaMedia: 0.1497
    }
  ];

  readonly processMethods: ProcessInfo[] = [
    {
      method: 'basico',
      name: 'Proceso Básico',
      description: 'Calcinación simple sin pretratamiento',
      temperature: '500-600°C',
      pretreatment: 'Sin pretratamiento',
      ashFactor: 0.13,
      purityMin: 0.87,
      purityMax: 0.90,
      purityMedia: 0.885,
      yield: 0.115,
      source: 'Método tradicional'
    },
    {
      method: 'estandar',
      name: 'Proceso Estándar',
      description: 'Pretratamiento con HCl y calcinación a 800°C',
      temperature: '800°C',
      pretreatment: 'HCl 0,1M',
      ashFactor: 0.20,
      purityMin: 0.90,
      purityMax: 0.95,
      purityMedia: 0.925,
      yield: 0.185,
      source: 'Scielo Colombia 2007'
    },
    {
      method: 'avanzado',
      name: 'Proceso Avanzado',
      description: 'Pretratamiento con HNO₃ y calcinación optimizada',
      temperature: '620°C',
      pretreatment: 'HNO₃ 0,2M',
      ashFactor: 0.22,
      purityMin: 0.949,
      purityMax: 0.995,
      purityMedia: 0.972,
      yield: 0.214,
      source: 'Un Valle - Rev Ing y Competitividad 2024'
    }
  ];

  readonly marketValues: MarketValue[] = [
    {
      grade: 'Industrial',
      priceUSDPerKg: 2,
      priceMinCOP: 8400,
      priceMaxCOP: 21000,
      applications: ['Construcción', 'Caucho', 'Catalizadores']
    },
    {
      grade: 'Especial',
      priceUSDPerKg: 10,
      priceMinCOP: 42000,
      priceMaxCOP: 210000,
      applications: ['Electrónica', 'Cosmética', 'Alta tecnología']
    }
  ];

  calculate(
    residueKg: number,
    residueType: ResidueType,
    processMethod: ProcessMethod,
    unit: 'kg' | 'toneladas' | 'cargas' = 'kg'
  ): CalculationResult {
    // Get unit multiplier (1 carga = 125 kg)
    let unitValue = 1;
    if (unit === 'toneladas') {
      unitValue = 1000;
    } else if (unit === 'cargas') {
      unitValue = 125;
    }
    
    const residueKgActual = residueKg * unitValue;
    
    // Get residue info
    const residueInfo = this.residueTypes.find(r => r.type === residueType)!;
    
    // Get process info
    const processInfo = this.processMethods.find(p => p.method === processMethod)!;
    
    // Calculate ash (kg)
    const ashKg = residueKgActual * processInfo.ashFactor;
    
    // Calculate silica (kg)
    const silicaKgMin = ashKg * processInfo.purityMin;
    const silicaKgMax = ashKg * processInfo.purityMax;
    const silicaKgMedia = ashKg * processInfo.purityMedia;
    
    // Calculate yield percentage
    const yieldPercent = (silicaKgMedia / residueKgActual) * 100;
    
    // Determine grade based on purity
    const grade: 'industrial' | 'especial' = 
      processInfo.purityMedia >= 0.95 ? 'especial' : 'industrial';
    
    // Estimate surface area (m²/g)
    const surfaceArea = processInfo.purityMedia * 300;
    
    // Calculate valorization (COP)
    const industrialMinCOP = silicaKgMin * 2 * this.USD_TO_COP;
    const industrialMaxCOP = silicaKgMax * 5 * this.USD_TO_COP;
    const especialMinCOP = silicaKgMin * 10 * this.USD_TO_COP;
    const especialMaxCOP = silicaKgMax * 50 * this.USD_TO_COP;
    
    // Calculate environmental benefits
    const hectaresEquivalent = residueKgActual / this.KG_TAMO_PER_HECTARE;
    const fineAvoidedCOP = hectaresEquivalent * this.FINE_PER_HECTARE;
    
    return {
      residueKg: residueKgActual,
      residueType,
      processMethod,
      unit,
      unitValue,
      ashKg,
      silicaKgMin,
      silicaKgMax,
      silicaKgMedia,
      silicaKg: silicaKgMedia,
      yieldPercent,
      purityPercent: processInfo.purityMedia * 100,
      grade,
      surfaceArea,
      industrialMinCOP,
      industrialMaxCOP,
      especialMinCOP,
      especialMaxCOP,
      hectaresEquivalent,
      fineAvoidedCOP
    };
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }

  formatWeight(kg: number): string {
    if (kg >= 1000) {
      return `${(kg / 1000).toFixed(2)} ton`;
    } else if (kg >= 1) {
      return `${kg.toFixed(2)} kg`;
    } else {
      return `${(kg * 1000).toFixed(2)} g`;
    }
  }

  formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}