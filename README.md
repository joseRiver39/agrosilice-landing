# AGROsilice Landing

Plataforma web profesional desarrollada en Angular 19 que educa a los productores de arroz en Colombia sobre el valor económico del tamo de arroz y su transformación en sílice amorfa de alta pureza, incluyendo una calculadora científica interactiva de rendimiento.

## Descripción

**AGROsilice** es una plataforma web que resuelve un problema crítico: actualmente los productores de arroz en Colombia queman más del 91% del tamo (restos de la planta) a cielo abierto, lo que genera:
- Multas ambientales de hasta $1.500.000 COP por hectárea quemada
- Emisiones de CO₂ y material particulado
- Pérdida económica de hasta $200.000 COP por tonelada

Esta página educa sobre cómo transformar este residuo en **sílice amorfa de alta pureza**, un producto valioso con aplicaciones en:
- Construcción (hormigones, morteros)
- Caucho y neumáticos
- Cosmética
- Agricultura
- Alta tecnología (electrónica, baterías de litio)

## Calculadora Científica

La herramienta principal es una **calculadora científica interactiva** que permite a los productores:

1. **Seleccionar el tipo de residuo**: Tamo, cascarilla o mezcla
2. **Ingresar la cantidad**: En kg, toneladas o cargas
3. **Elegir el método de procesamiento**: Básico, estándar o avanzado

La calculadora muestra en tiempo real:
- Cantidad de sílice obtenible
- Pureza alcanzable (87-99.5%)
- Valorización económica (COP)
- Multas ambientales evitadas

## Tecnologías Utilizadas

- **Angular 19** con componentes independientes
- **TypeScript** con strict mode
- **SCSS** con Design Tokens
- **Señales Angulares** para reactividad
- **Tailwind CSS v3**
- **ReactiveForms** para formularios
- Preparado para **SSR** con Angular Universal

## Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Desarrollo
npm start

# Producción
npm run build
```

El servidor de desarrollo estará disponible en `http://localhost:12000`

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── tokens/
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   └── pipes/
│   └── features/landing/
│       └── components/
├── styles.scss
└── index.html
```

## Características de la Página

- **Barra de navegación** sticky con sombra al hacer scroll, menú hamburguesa para móvil
- **Sección Hero** con animación de partículas doradas (Canvas API), contadores animados
- **Sección Problema** con 4 cards animadas con IntersectionObserver
- **Sección Proceso** timeline vertical/horizontal con 6 pasos
- **Sección Aplicaciones** 7 tarjetas con expansión/contracción (Animaciones Angular)
- **Calculadora** científica completa con ReactiveForms
- **Sección Mercado** valores de mercado
- **Sección Biorrefinería** economía circular
- **Sección Contacto** formulario reactivo
- **Footer** profesional

## Licencia

MIT

---

**AGROsilice** - Transformando residuos agrícolas en oportunidades económicas y ambientales.