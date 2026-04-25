export type ResidueType = 'tamo' | 'cascarilla' | 'mezcla';

export interface ResidueInfo {
  type: ResidueType;
  name: string;
  description: string;
  silicaMin: number;
  silicaMax: number;
  silicaMedia: number;
}

export type ProcessMethod = 'basico' | 'estandar' | 'avanzado';

export interface ProcessInfo {
  method: ProcessMethod;
  name: string;
  description: string;
  temperature: string;
  pretreatment: string;
  ashFactor: number;
  purityMin: number;
  purityMax: number;
  purityMedia: number;
  yield: number;
  source: string;
}

export interface CalculationResult {
  residueKg: number;
  residueType: ResidueType;
  processMethod: ProcessMethod;
  unit: 'kg' | 'toneladas' | 'cargas';
  unitValue: number;
  
  // Calculated values
  ashKg: number;
  silicaKgMin: number;
  silicaKgMax: number;
  silicaKgMedia: number;
  silicaKg: number;
  yieldPercent: number;
  
  // Purity
  purityPercent: number;
  grade: 'industrial' | 'especial';
  surfaceArea: number;
  
  // Valorization (COP)
  industrialMinCOP: number;
  industrialMaxCOP: number;
  especialMinCOP: number;
  especialMaxCOP: number;
  
  // Environmental
  hectaresEquivalent: number;
  fineAvoidedCOP: number;
}

export interface MarketValue {
  grade: string;
  priceUSDPerKg: number;
  priceMinCOP: number;
  priceMaxCOP: number;
  applications: string[];
}

// Design tokens for the application
export interface AppTokens {
  colors: {
    primary: string[];
    accent: string[];
    neutral: string[];
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}