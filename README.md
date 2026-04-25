# AGROsilice - RiSil Landing

Plataforma web profesional de alto impacto desarrollada en **Angular 19**. RiSil educa a los productores de arroz en Colombia sobre la valorización del tamo de arroz, transformando un residuo contaminante en sílice amorfa de alta pureza (oro blanco).

## 🚀 Características Principales

- **Diseño Premium & Responsivo**: Interfaz optimizada para móviles, tablets y escritorio con estética moderna.
- **Calculadora Científica Interactiva**: Herramienta de alta precisión para estimar rendimientos, pureza y valor económico del residuo.
- **Visualización de Impacto**: Secciones dinámicas que detallan el problema ambiental, el proceso técnico de biorrefinería y las aplicaciones industriales.
- **Identidad Institucional**: Integración con la **UNAD** y enfoque en la economía circular del Tolima y Huila.

## 🛠️ Tecnologías

- **Angular 19**: Arquitectura moderna con Standalone Components y Signals.
- **Tailwind CSS**: Diseño responsivo y utilitario de alta velocidad.
- **Canvas API**: Fondo dinámico de partículas doradas en el Hero.
- **Intersection Observer**: Animaciones de entrada fluidas para mejorar la retención del usuario.
- **Gestión de Activos**: Sistema de imágenes locales en alta resolución para rendimiento offline y estabilidad.

## 📊 Calculadora RiSil

Permite a los usuarios estimar rendimientos y valorización del residuo.

### 🧪 Metodología de Cálculo
La calculadora utiliza un modelo basado en investigaciones de *SciELO Colombia* y la *Universidad del Valle*:
- **Rendimiento de Ceniza**: Del **13% al 22%** según el método térmico.
- **Pureza proyectada**: Del **88.5% al 99.5%** según el pretratamiento químico.
- **Valorización**: Basada en precios internacionales de sílice industrial ($2-5 USD/kg) y especial ($10-50 USD/kg).

### 💵 Origen de Datos (TRM)
Para la conversión a Pesos Colombianos, la app consume en tiempo real la **API de TRM Colombia**, obteniendo el valor oficial certificado por la Superintendencia Financiera.
- **Fuente**: [trm-colombia.vercel.app](https://trm-colombia.vercel.app/)

## 📦 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/           # Lógica de cálculo y modelos científicos
│   ├── features/       # Componentes de la página (Hero, Calculadora, Proceso, etc.)
│   └── shared/         # Directivas y utilidades comunes
public/
└── images/             # Activos visuales optimizados (Problema, Aplicaciones, UNAD)
```

## 👨‍💻 Créditos

- **Desarrollado por**: Jose Rivera
- **Institución**: Universidad Nacional Abierta y a Distancia (UNAD)

---
**RiSil** - *Transformando residuos agrícolas en oportunidades económicas y ambientales.*