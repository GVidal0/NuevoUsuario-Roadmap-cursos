# SPEC — [Aprendamos]

> **Qué es este documento:** tu versión refinada de la SPEC de clase.
> El repo empieza con la SPEC de clase **tal cual** (primer commit). Este archivo es su evolución:
> mismos requisitos, ambigüedades resueltas, decisiones incorporadas.
> **Regla:** si la SPEC de clase no lo decía y vos lo definiste, queda acá (con el porqué)
> o se referencia al documento donde quedó decidido (PRD para producto, TRD para técnica).
> **Cuándo está bien:** un lector que no estuvo en el aula del 20/10 entiende el producto
> completo leyendo solo este archivo, y puede rastrear cada decisión hasta su origen.

## 1. Identidad del producto

- **Nombre propio:** Aprendamos
- **Una línea:** Es una webapp dirigida a toda la comunidad que desee formarse. Fue pensada por un grupo de estudiantes para subir en un mismo lugar un conjunto de cursos gratuitos que permiten gestionar el aprendizaje de cada persona a través de roadmaps

## 2. Problema

Las personas que desconocen algún tema, y sienten curiosidad por aprender, o conocer del mismo, deben acceder a cursos pagos o a lo sumo gratuitos pero que se encuentran distribuidos en diferentes páginas, canales de youtube, etc. En muchos casos, no pueden hacer un seguimiento de las nuevos conocimientos y habilidades adquiridos, ni tampcoo se puede saber con certeza que institución respalda dicho curso o si cuenta con la expedición de un certificado.
Por ello, Aprendamos nace como idea de la comunidad de alumnos que ve en esto una problemática. Por lo tanto ofrecen para paliar esta situación, que cada estudiante pueda gestionar su propio roadmap, sepa quién ofrece el curso, y si ofrece certificados, entre otras cosas.


## 3. Visión

En el próximo año, Aprendamos será un espacio de formación estudiantil de referencia, será un espacio donde estén disponibles los principales cursos existentes de la materia de la cual desea ahondar conocimientos. 

## 4. Alcance

### Dentro

- Registro de usuarios, inicio de sesión y recuperación de contraseñas.

- Protección del inicio de sesión mediante rate limiting.

- Almacenamiento de contraseñas mediante bcrypt como mínimo, o un algoritmo más fuerte justificado en el TRD.

-Aporte de cursos gratuitos de cualquier plataforma o proveedor, con enlace web activo y los campos mínimos establecidos en la SPEC original.

-Declaración del usuario que aporta el curso indicando si lo tomó o no.

-Validación de los cursos aportados antes de incorporarlos al catálogo comunitario.

-Consulta del catálogo comunitario de cursos validados.

-Inclusión de cursos del catálogo en el catálogo o roadmap personal de cada usuario.

-Creación y gestión del roadmap personal.

-Diseño adaptable con enfoque mobile-first, mejora progresiva y menú sándwich en dispositivos móviles.

-Interfaz inspirada en Google Material, con valores visuales concretos definidos en UX-UI.md.

### Fuera (out of scope explícito)

-Creación de cursos, cuestionarios o exámenes educativos dentro de la aplicación.

-Cobro por cursos

-Emisión propia de certificados educativos.

-Desarrollo de aplicaciones móviles nativas.


## 5. Reglas de producto clave

| # | Regla | Origen |
|---|-------|--------|
| BR-001 | Los cursos aportados deben validarse antes de incorporarse al catálogo comunitario | SPEC clase |
| BR-002 | Cada usuario puede gestionar su propio roadmap personal | SPEC clase |
| BR-003 | Quien aporta un curso declara si lo tomó | SPEC clase |
| BR-004 | Los cursos aportados deben ser gratuitos y contar con un enlace web activo | SPEC clase |
| BR-005 | Para gestionar el roadmap personal, aportar cursos y acceder a las funciones de la cuenta, el usuario debe autenticarse | decisión propia.
|BR-006 | El catálogo podra consultarse sin iniciar sesión |  decisión propia.

> El detalle completo de reglas vive en el PRD §7. Acá van las 3 a 5 que definen el carácter del producto.

## 6. Stack registrado (versiones exactas con las que se va a desarrollar)

| Capa | Tecnología | Versión exacta instalada |
|------|------------|--------------------------|
| Frontend | React + Vite + pnpm | [ej. react 19.x, vite x.y, pnpm x.y] |
| Backend | FastAPI + uv | [ej. fastapi 0.158.x, uv x.y] |
| Base de datos | PostgreSQL | [18.6] |
| Infra (dev) | Docker + Docker Compose | [versión] |

Las versiones exactar instaladas se verificarán y documentarán en el TRD antes de iniciar el desarrollo.  

> Verificá con `pnpm -v`, `uv --version`, `docker --version` etc. y registrá lo que **realmente** instalaste.

## 7. Restricciones técnicas heredadas de la SPEC de clase

| # | Restricción | Cómo la vamos a cumplir (1-2 líneas) |
|---|-------------|--------------------------------------|
| 1 | Mobile-first con mejora progresiva: base sin media queries; `@media (min-width: …)` solo para agregar/mejorar | [Diseñaremos primero para pantallas pequeñas y utilizaremos media queries únicamente para mejorar la presentación en pantallas más grandes.] |

| 2 | Paginación de todas las consultas de listado y de sus tablas | [decisión: Todos los listados tendrán paginación. La estrategia técnica se definirá en TRD.md.] |

| 3 | Menú sándwich en mobile | [La navegación móvil utilizará un menú sándwich; su comportamiento y diseño se especificarán en UX-UI.md.] |

| 4 | Screaming Architecture | [Organizaremos la estructura de carpetas por dominios del negocio, no solamente por tecnologías. El detalle se definirá en TRD.md.] |

## 8. Vacíos de la SPEC de clase y decisiones tomadas

> La SPEC de clase fue escrita a propósito incompleta. Esta tabla es la prueba de que
> los huecos los **resolviste vos**, no que los esquivaste.

| # | Vacío detectado en la SPEC | Opciones consideradas | Decisión | Dónde se desarrolla |
|---|----------------------------|-----------------------|----------|---------------------|
| 1 | [ ¿quién valida los cursos aportados?] | [Validación por adminstrador o validación comunitaria] | [Un administrador revisa los cursos aportados y decide si se incoporan al catálogo comunitario] [PRD: reglas de negocio y permisos / TRD: implementacion de roles y validación] |
| 2 | [¿hay roles?] |Todos los usuarios con los mismos permisos o usuarios con permisos diferentes | Se definen dos roles: usuario y administrador. El adminsitrador tiene permisos adicionales para validad cursos |PRD: permisos por rol. TDR: Autorizacion y modelo de datos |
| 3 | [¿qué es exactamente "incluir en mi catálogo o roadmap personal"?] | Incoporarlo a una coleccion personal o a una secuencia ordenada de aprendizaje | El usuario puede incorporar un curso validado a su roadmap personal y ordenar los cursos según su secuencia de aprendizaje | PRD Y APPFlow. |
| 4 | [¿la búsqueda es por texto, filtro, o ambos?] | Busqueda por texto, filtros, o ambas | Ambas | PRD Y UX-UI.md |
| 5 | ¿Como se recupera la contraseña? | Recuperacion mediante enlance o token temporal | Se implementará en el ciclo completo exigido por la SPEC de clase: solicitud, enlace/token y nueva contraseña | PRD Y TDR |

## 9. Historia de la SPEC (autoregistro de cambios)

| Fecha | Cambio | Por qué |
|-------|--------|---------|
| 20/10/2026 | SPEC de clase recibida en el aula | — |
| 23/10/2026 | Primer commit: SPEC de clase tal cual | Cumplimeinto de la consigna de conservar la SPEC original|
| [23/10/2026] | [Finalización y commit de esta SPEC] | [Consolidar la especificación del producto Aprendamos y registrar la decisiones adoptadas.] |
