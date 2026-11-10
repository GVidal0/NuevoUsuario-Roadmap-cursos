# UX-UI — Guía visual de estilos — Aprendamos

> **Qué es:** la gramática visual de la interfaz: tokens, componentes, estados, accesibilidad.
> No es un prototipo navegable (eso lo cubre el APPFlow); es el conjunto de reglas con las que
> se construye cada pantalla **antes** de escribir CSS.
> **Inspiración fijada por la SPEC:** la apariencia y experiencia deben ser similares a **Google**
> (estética Material: limpieza, espacio en blanco, azul primario, sombras sutiles, radios amplios).
> **Ejemplo completado:** [`03_UX-UI_EJEMPLO.md`](./03_UX-UI_EJEMPLO.md) — mirá el nivel de detalle
> esperado; no lo copies, adaptá.
> **Cuándo está bien:** dos personas que sigan esta guía construyen la misma pantalla y queda
> igual; todos los estados de cada componente (focus, error, empty, loading) están definidos
> de antemano; la estrategia mobile-first con mejora progresiva es explícita.

## 1. Principios (3 a 5)

- Mobile primero: el layout base se diseña para 360px y se mejora, nunca se repara.
- Claridad sobre decoración: la información de los cursos y las acciones principales tienen prioridad sobre los elementos visuales innecesarios.
- Inspiración Google Material: se utilizan espacios en blanco, azul primario, superficies claras, sombras sutiles y radios consistentes.
- Estados visibles: los estados de carga, error, vacío y deshabilitado se definen antes de implementar los componentes.
- Accesibilidad desde el diseño: se priorizan el contraste suficiente, la navegación por teclado y el foco visible.

## 2. Design tokens

### 2.1 Paleta de colores

| Token | Valor | Uso | Contraste AA |
|-------|-------|-----|--------------|
| `--color-primary` | `#1a73e8` | Botones primarios, enlaces, foco y elementos activos | vs blanco ≈ 4.5:1 ✓ AA |
| `--color-primary-dark` | `#185abc` | Hover y estado activo de elementos primarios | — |
| `--color-primary-container` | `#e8f0fe` | Fondo de categorías seleccionadas y elementos activos del menú | — |
| `--color-on-primary` | `#ffffff` | Texto e iconos sobre el color primario | vs primary ≈ 4.5:1 ✓ AA |
| `--color-surface` | `#ffffff` | Tarjetas de cursos, formularios y paneles | — |
| `--color-background` | `#f8f9fa` | Fondo general de las páginas | — |
| `--color-text` | `#202124` | Texto principal, títulos y etiquetas | vs blanco ≈ 16:1 ✓ AA |
| `--color-text-muted` | `#5f6368` | Descripciones, docentes y metadatos | vs blanco ≈ 7:1 ✓ AA |
| `--color-border` | `#dadce0` | Bordes de campos y separadores | Ver nota de accesibilidad §6 |
| `--color-hover-grey` | `#f1f3f4` | Hover de botones secundarios, filas y elementos de navegación | — |
| `--color-success` | `#188038` | Confirmaciones y operaciones exitosas | Verificar según el fondo |
| `--color-warning` | `#f9ab00` | Avisos y cursos pendientes de revisión | Verificar según el fondo |
| `--color-error` | `#d93025` | Errores de validación y operaciones fallidas | Verificar según el fondo |

> Los colores siguen la paleta de productos Google y la estética Material. Verificá cada ratio en https://webaim.org/resources/contrastchecker/ y anotá el valor real.

### 2.2 Tipografía

| Token | Familia | Tamaño / line-height | Uso |
|-------|---------|----------------------|-----|
| `--font-family-base` | Roboto, `system-ui`, sans-serif | — | cuerpo y textos generales |
| `--text-sm` | Heredada de `--font-family-base` | 14px / 20px | metadatos, docentes y badges |
| `--text-base` | Heredada de `--font-family-base` | 16px / 24px | texto de formularios y párrafos |
| `--text-lg` | Heredada de `--font-family-base` | 18px / 24px | títulos de tarjetas de cursos |
| `--text-xl` | Heredada de `--font-family-base` | 22px / 28px | títulos de pantalla |

> Roboto se elige por su coherencia con la inspiración Google Material. Si se carga desde Google Fonts o se aloja localmente, se utilizará `font-display: swap`.

### 2.3 Espaciado, radios, sombras, z-index

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` … `--space-8` | 4, 8, 12, 16, 24, 32, 40, 48 px | Espaciado entre elementos y márgenes |
| `--radius-input` | 8px | Campos de formularios y selects |
| `--radius-card` | 12px | Tarjetas de cursos |
| `--radius-button` | 18px | Botones primarios y secundarios |
| `--radius-modal` | 28px | Ventanas modales |
| `--shadow-1` | `0 1px 2px rgba(60, 64, 67, .1), 0 1px 3px 1px rgba(60, 64, 67, .15)` | Elevación inicial de tarjetas |
| `--shadow-2` | `0 1px 2px rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15)` | Tarjetas en hover, menú y modales |
| `--z-header` | 100 | Header sticky |
| `--z-drawer` | 200 | Menú sándwich y overlay |
| `--z-modal` | 300 | Ventanas modales |
| `--z-toast` | 400 | Notificaciones temporales |

### 2.4 Bloque de variables listo para copiar

```css
:root {
  --color-primary: #1a73e8;
  --color-primary-dark: #185abc;
  --color-primary-container: #e8f0fe;
  --color-on-primary: #ffffff;
  --color-surface: #ffffff;
  --color-background: #f8f9fa;
  --color-text: #202124;
  --color-text-muted: #5f6368;
  --color-border: #dadce0;
  --color-hover-grey: #f1f3f4;
  --color-success: #188038;
  --color-warning: #f9ab00;
  --color-error: #d93025;

  --font-family-base: "Roboto", system-ui, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;
  --space-8: 48px;

  --radius-input: 8px;
  --radius-card: 12px;
  --radius-button: 18px;
  --radius-modal: 28px;

  --shadow-1: 0 1px 2px rgba(60, 64, 67, .1), 0 1px 3px 1px rgba(60, 64, 67, .15);
  --shadow-2: 0 1px 2px rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);

  --z-header: 100;
  --z-drawer: 200;
  --z-modal: 300;
  --z-toast: 400;
}
```

## 3. Estrategia mobile-first con mejora progresiva

> Obligatorio según la SPEC. **Prohibido** usar media queries para "arreglar" el layout base:
> solo para agregar o mejorar a medida que la pantalla crece.

| Capa | Dónde aplica | Qué define |
|------|--------------|------------|
| **Base (sin MQ)** | Todos los viewports | Una columna; header con menú sándwich; tarjetas de cursos apiladas; tablas densas como tarjetas; targets ≥ 44px. |
| `@media (min-width: 768px)` | Tablet | Grid de dos columnas; navegación horizontal en el header; tablas como tablas reales; mayor espacio entre elementos. |
| `@media (min-width: 1024px)` | Desktop | Grid de tres columnas; contenedor `max-width: 1140px`; menú sándwich oculto y navegación horizontal visible. |

## 4. Componentes (anatomía + estados)

> Por cada componente: anatomía breve, tokens usados y **todos** sus estados.

### 4.1 Botón (primario / secundario / peligro)

- **Primario (filled):** fondo `--color-primary`, texto `--color-on-primary`, radio `--radius-button`, padding `11px 23px` y tipografía `--text-sm`. Hover: `--color-primary-dark` y `--shadow-1`.
- **Secundario (text button):** sin fondo; texto `--color-primary`; hover: fondo `--color-hover-grey`.
- **Peligro:** texto `--color-error`; confirmación antes de ejecutar acciones destructivas.
- Estados de todos: `default`, `hover`, `focus-visible` (anillo de 2px con offset de 2px), `active`, `disabled` y `loading` (indicador de carga y botón deshabilitado).

### 4.2 Campo de formulario

- Outlined: borde de 1px `--color-border`, radio `--radius-input` y etiqueta siempre visible.
- Estados: `default`, `focus` (borde de 2px `--color-primary`), `filled`, `error` (borde y etiqueta `--color-error` + mensaje asociado mediante `aria-describedby`) y `disabled` (fondo `--color-hover-grey`).

### 4.3 Card de curso

- Superficie `--color-surface`, radio `--radius-card`, `--shadow-1` y padding `--space-4`.
- Contenido: título (`--text-lg`, `--color-text`), categoría como chip (`--color-primary-container` / texto `--color-primary-dark`), docentes en `--text-sm` y `--color-text-muted`, e indicadores de certificado, examen y aval cuando corresponda.
- Estados: `default`, `hover` (`--shadow-2`, cuando la tarjeta sea interactiva) y `seleccionada` (borde `--color-primary` + indicador visual).

### 4.4 Lista/tabla paginada

- ≥ 768px: tabla real, filas con divisor `--color-border` y hover `--color-hover-grey`.
- < 768px: las mismas filas como tarjetas apiladas, conservando la información sin scroll horizontal.
- Paginador: controles anterior/siguiente y números de página; página actual con fondo `--color-primary-container`.
- Estado vacío: mensaje explicativo y acción para explorar el catálogo o aportar un curso, según el contexto.

### 4.5 Menú sándwich (drawer)

- Botón hamburguesa con icono `menu` en el header, visible en pantallas menores a 1024px.
- Panel: fondo `--color-surface`, sombra `--shadow-2`, borde derecho redondeado y ancho de 280px.
- Ítems: altura de 48px; elemento activo con fondo `--color-primary-container` y texto `--color-primary-dark`.
- Cierre: seleccionar un enlace, botón X, tecla `ESC` o click en el overlay.
- ARIA: `aria-expanded`, `aria-controls`, foco gestionado al abrir y restaurado al cerrar.

### 4.6 Modal

- Superficie `--color-surface`, radio `--radius-modal`, sombra `--shadow-2` y overlay semitransparente.
- Estados: `cerrado` y `abierto`.
- Comportamiento: foco contenido dentro del modal mientras esté abierto, cierre con `ESC` y botón X, y devolución del foco al elemento que lo abrió.

### 4.7 Snackbar (toast)

- Fondo `#323232`, texto blanco, radio `--radius-snackbar` y posición inferior centrada en mobile e inferior izquierda en desktop.
- Tipos: éxito, error e información.
- Duración: entre 4 y 6 segundos; incluir acción «Deshacer» cuando corresponda.
- Accesibilidad: `role="status"` para mensajes informativos y de éxito; los errores urgentes podrán utilizar `role="alert"`.

### 4.8 Skeleton y Empty state

- Skeleton: bloques con fondo `--color-hover-grey`; se utilizan durante la carga de listados y detalles.
- Empty state: icono, título (`--text-lg`), descripción y CTA primario cuando corresponda. Ejemplo: «Todavía no hay cursos en esta categoría» con acceso al catálogo o a la opción de aportar un curso.

## 5. Layout y navegación

- **Header:** sticky (`--z-header`), fondo `--color-surface`, altura de 64px; en mobile muestra logo y hamburguesa, mientras que en desktop muestra logo, navegación horizontal y acciones de sesión.
- **Contenedor:** `max-width: 1140px`, padding lateral `--space-4` en mobile y `--space-5` en desktop.
- **Pantallas:** el detalle de cada pantalla y sus recorridos se define en `APPFlow.md`; esta guía establece la apariencia y las reglas visuales compartidas.

## 6. Accesibilidad mínima (no negociable)

- [ ] Texto normal con contraste mínimo de 4.5:1 y texto grande con mínimo de 3:1.
- [ ] Controles e indicadores visuales necesarios con contraste suficiente; no depender únicamente del color para comunicar estados.
- [ ] `:focus-visible` visible en todos los elementos interactivos.
- [ ] Menú sándwich con `aria-expanded`, `aria-controls` y manejo correcto del foco.
- [ ] `prefers-reduced-motion: reduce` desactiva o reduce animaciones no esenciales.
- [ ] Imágenes informativas con `alt`; iconos decorativos con `aria-hidden="true"` e iconos de acción con nombre accesible.
- [ ] Errores de formulario asociados al campo mediante `aria-describedby`.
- [ ] Formularios y navegación utilizables mediante teclado.

## 7. Iconografía y assets

- Set elegido: Material Symbols, conjunto de iconos de Google.
- Por qué: mantiene la coherencia con la inspiración Google Material definida en la SPEC.
- Tamaño por defecto: 20px en botones y 24px en listas; el color hereda del texto o del estado del componente.
- Imágenes: utilizar imágenes relacionadas con los cursos cuando aporten información; evitar imágenes decorativas innecesarias.
- Carga de recursos: las fuentes e iconos podrán alojarse localmente o cargarse desde su fuente oficial, según la configuración del proyecto.

---

**Referencias:**
- NN/g — Front-End Style-Guides (definición y checklist): https://www.nngroup.com/articles/front-end-style-guides/
- NN/g — Design Systems 101: https://www.nngroup.com/articles/design-systems-101/
