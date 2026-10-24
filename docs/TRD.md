# TRD — Technical Requirements Document — Aprendamos

> **Qué es:** el CÓMO técnico. Decisiones de arquitectura, stack, estructura de carpetas y
> convenciones. No es el plan de tareas (eso es el IMPLEMENTATION_PLAN) ni el producto (PRD).
> **Cuándo está bien:** un developer que no estuvo en la charla puede levantar el proyecto y
> tomar las mismas decisiones que vos; cada decisión importante tiene alternativas, la opción
> elegida y el porqué.

## 1. Stack y versiones exactas

| Capa | Elección | Versión exacta | Por qué |
|------|----------|----------------|---------|
| Frontend | React + Vite + pnpm | Node.js 24.17.0; pnpm 12.15.0; React 19.x y Vite ^6.3.0 | Permite desarrollar una SPA con componentes y herramientas de desarrollo integradas. |
| Backend | FastAPI + uv | Python 3.12 y 3.13 disponibles; FastAPI 0.111.0; versión de uv pendiente de verificar. | Permite construir una API HTTP con validación de datos y documentación automática. |
| ORM / driver | SQLAlchemy + psycopg | SQLAlchemy 2.0.29; versión de psycopg pendiente de verificar. | SQLAlchemy permite mapear entidades y consultar la base de datos; psycopg permite conectar Python con PostgreSQL. |
| BD | PostgreSQL | 18.6 | fijado por SPEC |
| Infra (dev) | Docker + Compose | Docker 29.7.2; Docker Compose 5.4.0. |Permite levantar frontend, backend y base de datos en un entorno reproducible. |

## 2. Decisiones técnicas 

| # | Decisión | Alternativas consideradas | Elegida | Por qué |
|---|----------|---------------------------|---------|---------|
| TD-001 | Autenticación y gestión de sesiones | JWT stateless / sesiones administradas por el servidor / proveedor externo | Sesiones administradas por el servidor mediante cookies seguras | Permite gestionar las sesiones sin depender de un proveedor externo. |
| TD-002 | Paginación del catálogo | Devolver todos los resultados / paginación por número de página y offset / paginación por cursor | Paginación por número de página y offset, con 20 elementos por defecto | Es sencilla de implementar y permite navegar directamente a una página determinada. |
| TD-003 | Formato de errores de la API | Formato propio / Problem Details (RFC 9457) | `application/problem+json`, conforme a RFC 9457 | Proporciona una estructura uniforme para comunicar errores HTTP. |
| TD-004 | Modelado de las hojas de ruta personales | Guardar el orden y el estado en el curso / utilizar una entidad intermedia | Entidad intermedia que registra el curso, su posición y su estado de finalización | Permite que un mismo curso tenga distinto orden y progreso en cada hoja de ruta. |
| TD-005 | Validación de aportes al catálogo | Publicación inmediata / publicación después de una revisión administrativa | Mantener los aportes pendientes hasta su aprobación o rechazo por un administrador | Garantiza que únicamente los cursos validados se incorporen al catálogo público. |

## 3. Arquitectura

### 3.1 Patrón y capas

Screaming Architecture + arquitectura en capas:

```mermaid
flowchart LR
    HTTP[HTTP / Controllers] --> SVC[Services — lógica de negocio]
    SVC --> REPO[Repositories — acceso a datos]
    REPO --> DB[(PostgreSQL)]
    SVC --> MODELS[Models / entidades]
```

- **Controllers:** reciben HTTP, validan input, delegan. Sin lógica de negocio.
- **Services:** reglas de negocio puras y testeables (sin BD, sin HTTP).
- **Repositories:** única puerta a la BD. Sin reglas de negocio.
- **La estructura de carpetas habla del dominio**, no del framework.

### 3.2 Estructura de carpetas (la que se va a crear en la Instancia B)

```
Roadmap-cursos/
├── backend/
│   ├── pyproject.toml
│   ├── Dockerfile
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── [feature_o_dominio]/        # ej. cursos/, aportes/, roadmap/, identidad/
│   │   │   ├── router.py               # endpoints de esa feature
│   │   │   ├── service.py              # reglas de negocio
│   │   │   ├── repository.py           # acceso a datos
│   │   │   └── models.py               # entidades / schemas
│   │   └── ...
│   └── tests/
├── frontend/
│   ├── package.json
│   ├── Dockerfile
│   └── src/
│       ├── main.jsx
│       ├── app/                        # shell, router, layout global
│       ├── features/                   # ej. catalogo/, aportar/, roadmap/
│       │   └── [feature]/
│       │       ├── components/
│       │       ├── hooks/
│       │       └── api.js
│       └── styles/                     # tokens globales (de UX-UI)
├── docker-compose.yml
└── docs/
```

### 3.3 Servicios Docker (entorno de desarrollo)

| Servicio | Imagen/base | Puerto | Rol |
|----------|-------------|--------|-----|
| postgres | postgres:18.6 | 5432 | base de datos |
| backend | python:3.x-slim + uv | 8000 | API FastAPI (dev) |
| frontend | node:20-alpine + pnpm | 5173 | SPA Vite (dev server) |

```mermaid
flowchart LR
    BROWSER[Navegador :5173] --> FE[frontend Vite]
    FE -- "/api/*" --> BE[backend FastAPI :8000]
    BE --> PG[(postgres :5432)]
```

> En la clase del 27/10 estos Dockerfiles evolucionan a multi-stage. Por ahora, lo mínimo que levanta.

## 4. Convenciones

- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `docker:` Cada commit deberá describir claramente el cambio realizado
- **Flujo de Git:**
  - **Ramas:** `main` se utilizará como rama principal. Los cambios se desarrollarán en ramas separadas según la tarea.
  - **Naming:** se utilizarán prefijos descriptivos: `feat/` para funcionalidades, `fix/` para correcciones y `docs/` para documentación. Ejemplos: `feat/catalogo-cursos`, `fix/validacion-aportes` y `docs/arquitectura`.
  - **Commits:** cada cambio se registrará mediante commits pequeños, con mensajes que respeten Conventional Commits.
  - **Integración:** las ramas se integrarán en `main` mediante una solicitud de incorporación de cambios (Pull Request), después de verificar que los cambios cumplen los requisitos de la tarea.
  - **Revisión:** los cambios serán revisados por otro integrante del equipo o por el responsable designado para la tarea. Si el trabajo es individual, se verificará el cumplimiento de los requisitos antes de integrar los cambios.
  - **Entrega académica:** se respetarán las instrucciones de la cátedra respecto de las ramas, las revisiones y la entrega del repositorio.
- **Errores de API:** se utilizará el formato `application/problem+json`, conforme a RFC 9457. Las respuestas de error incluirán los campos `type`, `title` y `status`, y podrán incluir `detail` para explicar el error de forma comprensible. Los errores de validación podrán incorporar información adicional sobre los campos afectados.

  Ejemplo de respuesta JSON:

  ```json
  {
    "type": "about:blank",
    "title": "Error de validación",
    "status": 422,
    "detail": "El título del curso es obligatorio."
  }
  ```
- **Variables de entorno:**

  | Variable | Ejemplo | Obligatoria | Descripción |
  |----------|---------|-------------|-------------|
  | `DATABASE_URL` | `postgresql+psycopg://aprendamos_user:clave@postgres:5432/aprendamos` | Sí | Cadena de conexión utilizada por el backend para acceder a PostgreSQL. |
  | `POSTGRES_DB` | `aprendamos` | Sí | Nombre de la base de datos. |
  | `POSTGRES_USER` | `aprendamos_user` | Sí | Usuario de PostgreSQL. |
  | `POSTGRES_PASSWORD` | `cambiar_por_un_secreto_local` | Sí | Contraseña del usuario de PostgreSQL. |

  Los valores son ejemplos para el entorno de desarrollo. Las credenciales reales no deberán incorporarse al repositorio ni compartirse en archivos versionados. La configuración definitiva se establecerá al preparar Docker Compose.

- **Logging y excepciones:** se registrarán los errores inesperados del backend, los fallos de acceso a la base de datos y los eventos de autenticación relevantes. Las excepciones se gestionarán en la capa correspondiente y se devolverán respuestas HTTP adecuadas, sin exponer detalles internos. No se registrarán contraseñas, tokens de recuperación ni otros secretos.

## 5. Requisitos no funcionales técnicos (traducción de las restricciones)

| Restricción (SPEC) | Cómo se cumple | Dónde se verifica |
|--------------------|----------------|-------------------|
| RNF-001 — Paginación | Todas las consultas que devuelvan listados implementarán paginación en el backend. El tamaño predeterminado será de 20 elementos por página y se limitará el máximo permitido. | Pruebas de los endpoints de listado. |
| RNF-002 — Diseño adaptable | El frontend seguirá un enfoque mobile-first con mejora progresiva. Los estilos base se definirán para pantallas pequeñas y se utilizarán media queries con `min-width` para pantallas mayores. | Revisión de estilos y pruebas en distintos tamaños de pantalla. |
| RNF-003 — Navegación móvil | El menú de navegación utilizará un menú hamburguesa en pantallas pequeñas, accesible mediante teclado y con etiquetas y atributos accesibles. | Pruebas de navegación por teclado y revisión de accesibilidad. |
| RNF-004 — Organización del código | La aplicación se organizará por dominios funcionales, siguiendo Screaming Architecture y separando presentación, lógica de negocio y persistencia. | Revisión de la estructura de carpetas y de las responsabilidades de cada capa. |
| RNF-005 — Seguridad de contraseñas | Las contraseñas se almacenarán mediante hashing seguro, utilizando bcrypt como mínimo. Nunca se almacenarán en texto plano. | Revisión de la implementación y pruebas de autenticación. |
| RNF-006 — Protección del inicio de sesión | El backend limitará los intentos o solicitudes de inicio de sesión para reducir el riesgo de ataques por fuerza bruta. | Pruebas de autenticación y limitación de intentos. |
| RNF-007 — Interfaz y accesibilidad | La interfaz seguirá las pautas visuales inspiradas en Google Material definidas en UX-UI. Se utilizarán HTML semántico, etiquetas accesibles, estados visibles y navegación por teclado. | Revisión de la interfaz y pruebas de accesibilidad. |
| RNF-008 — Protección de datos y configuración | Las credenciales y los secretos se gestionarán mediante variables de entorno y no se incorporarán al repositorio. | Revisión de la configuración y del repositorio. |
| RNF-009 — Validación de entradas | El backend validará los datos recibidos antes de procesarlos o persistirlos. Las validaciones del frontend no reemplazarán los controles del servidor. | Pruebas de validación de los endpoints. |

## 6. Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Validación de enlaces externos de cursos más compleja de lo estimado. | Media | Medio | Validar el formato de las URL y permitir la revisión administrativa de los aportes, sin depender exclusivamente de comprobaciones automáticas. |
| Acceso no autorizado a funciones administrativas o cuentas de usuarios. | Media | Alto | Verificar permisos en el backend, aplicar hashing seguro de contraseñas y limitar los intentos de inicio de sesión. |
| Inconsistencias en el orden y el progreso de las hojas de ruta personales. | Media | Medio | Mantener el orden y el estado de finalización asociados a cada hoja de ruta y validar las operaciones en el backend. |
| Diferencias de configuración entre los entornos de desarrollo. | Media | Medio | Documentar las versiones de las herramientas y utilizar Docker Compose para reproducir el entorno de ejecución. |

---

**Referencia:**
- Design Docs at Google (el clásico de los design docs, con énfasis en trade-offs):
  https://www.industrialempathy.com/posts/design-docs-at-google/
