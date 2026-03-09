# 📁 Estructura del Proyecto

## 🎯 **Organización Actual**

```
|-- public
|-- src
    |-- components
        |-- demo
            |-- ButtonDemo.svelte
            |-- Counter.svelte
            |-- LearningForm.svelte
            |-- TodoList.svelte
        |-- layout
            |-- Footer.astro
            |-- Header.astro
        |-- sections
            |-- Hero.astro
            |-- ServicesPreview.astro
        |-- ui
            |-- Button.svelte
            |-- Card.svelte
            |-- Icon.svelte
    |-- layouts
        |-- Layout.astro
    |-- lib
        |-- navigation.ts
        |-- theme.ts
        |-- utils.ts
    |-- modules
        |-- inicio
            |-- components
                |-- ServiceCard.svelte
            |-- sections
                |-- HeroSection.astro
                |-- ServicesGrid.astro
            |-- services
                |-- homeData.ts
            |-- utils
                |-- animations.ts
            |-- types
                |-- index.ts
            |-- index.ts
        |-- nosotros
            |-- components
            |-- sections
            |-- services
            |-- utils
            |-- types
            |-- index.ts
    |-- pages
        |-- blog
            |-- categoria
                |-- mi-primer-post.astro
            |-- index.astro
        |-- cotiza.astro
        |-- design-system.astro
        |-- index.astro
        |-- nosotros.astro
        |-- proyectos.astro
        |-- servicios.astro
    |-- styles
        |-- globals.css
    |-- types
        |-- index.ts
|-- .gitignore
|-- arbol_front.txt
|-- astro.config.mjs
|-- ESTRUCTURA_CARPETAS.md
|-- package-lock.json
|-- package.json
|-- README.md
|-- svelte.config.js
|-- tailwind.config.mjs
|-- tsconfig.json
```

## 📋 **Propósito de cada carpeta**

### 🧩 `/src/components/`
- **Propósito**: Todos los componentes reutilizables
- **Subcarpetas**:
  - `ui/`: Componentes básicos (Button, Input, Modal)
  - `sections/`: Secciones completas (Header, Footer, Hero)
  - Files directos: Componentes específicos del proyecto

### 🏗️ `/src/layouts/`
- **Propósito**: Templates base para páginas
- **Uso**: Estructura HTML común, meta tags, scripts globales

### 📄 `/src/pages/`
- **Propósito**: Sistema de routing de Astro
- **Convención**: `pages/about.astro` → `/about`

### 🎨 `/src/styles/`
- **Propósito**: Estilos CSS globales
- **Archivos**: Tailwind, fonts, reset CSS, utilidades

### 🛠️ `/src/lib/`
- **Propósito**: Lógica reutilizable
- **Contiene**: Utilidades, helpers, configuraciones

### 📝 `/src/types/`
- **Propósito**: Definiciones TypeScript
- **Beneficio**: Tipado consistente en todo el proyecto

### 📦 `/src/modules/`
- **Propósito**: Arquitectura modular por características
- **Beneficio**: Escalabilidad, mantenimiento y separación de responsabilidades
- **Estructura por módulo**:
  - `components/`: Componentes específicos del módulo
  - `sections/`: Secciones completas (Hero, Grid, etc.)
  - `services/`: Lógica de datos y APIs específicas
  - `utils/`: Utilidades y helpers del módulo  
  - `types/`: Tipos TypeScript del módulo
  - `index.ts`: Exportaciones centralizadas

## 🚀 **Uso de módulos**

### Importar desde un módulo:
```typescript
// Desde cualquier parte del proyecto
import { getHeroData, type Hero } from '@/modules/inicio';
import { ServiceCard } from '@/modules/inicio/components/ServiceCard.svelte';
```

### Usar en una página:
```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
import HeroSection from '@/modules/inicio/sections/HeroSection.astro';
import ServicesGrid from '@/modules/inicio/sections/ServicesGrid.astro';
---

<Layout title="Inicio">
  <HeroSection />
  <ServicesGrid />
</Layout>
```

### Ventajas de esta arquitectura:
- ✅ **Escalable**: Cada módulo maneja su propia lógica
- ✅ **Mantenible**: Cambios aislados por característica  
- ✅ **Reutilizable**: Componentes y lógica compartible
- ✅ **Tipado**: TypeScript en toda la estructura
- ✅ **Organizado**: Separación clara de responsabilidades