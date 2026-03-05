# 📁 Estructura del Proyecto

## 🎯 **Organización Actual**

```
src/
├── components/
│   ├── ui/                    # 🔧 Componentes básicos reutilizables
│   │   ├── Button.svelte         # ✅ Ya lo tienes aquí
│   │   └── Card.svelte           # ❌ Mover desde raíz
│   │
│   ├── layout/                # 🏗️ Header, Footer (ya tienes)
│   │   ├── Header.astro
│   │   └── Footer.astro
│   │
│   ├── sections/              # 📄 Secciones de páginas
│   │   ├── Hero.astro            # ❌ Crear (hero de index.astro)
│   │   ├── Services.astro        # ❌ Crear (services de index.astro)
│   │   └── Contact.svelte        # ❌ Crear (formulario cotizar)
│   │
│   └── demo/                  # 🧪 Componentes de prueba/demo
│       ├── Counter.svelte        # ❌ Mover desde raíz
│       ├── TodoList.svelte       # ❌ Mover desde raíz
│       └── ButtonDemo.svelte     # ❌ Mover desde raíz
│
├── lib/                       # 🛠️ Ya tienes theme.ts y utils.ts
├── pages/                     # 📄 Ya tienes las páginas
├── layouts/                   # 🏗️ Ya tienes Layout.astro
└── styles/                    # 🎨 Ya tienes globals.css
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

## 🚀 **Cuando el proyecto crezca:**

```
src/
├── components/
│   ├── ui/           # Botones, inputs, modals
│   ├── forms/        # Componentes de formulario 
│   ├── layout/       # Header, footer, nav
│   └── features/     # Características específicas
├── pages/
│   ├── api/          # Endpoints de API
│   ├── blog/         # Posts del blog
│   └── dashboard/    # Área privada
├── stores/           # Estado global (Svelte stores)
├── assets/           # Imágenes, icons, fonts
└── utils/
    ├── api.ts        # Llamadas HTTP
    ├── auth.ts       # Autenticación
    └── validation.ts # Validaciones
```

## 📚 **Mejores prácticas**

1. **Nomenclatura**: PascalCase para componentes, camelCase para utils
2. **Organización**: Por funcionalidad, no por tipo de archivo
3. **Imports**: Usar paths relativos o absolute imports
4. **Tipado**: Definir interfaces en `/types/` para reutilización

¡Esta estructura te permitirá escalar el proyecto manteniendo el código organizado! 🎯