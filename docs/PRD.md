# PRD — Product Requirements Document — Aprendamos

> **Qué es:** el QUÉ y el POR QUÉ. Para quién construimos, qué problema resuelve, qué hace
> y — con el mismo peso — qué **no** hace. No habla de tecnología ni de carpetas (eso es el TRD).
> **Cuándo está bien:** alguien del equipo puede construir la feature correcta sin preguntarte
> nada de producto; el "no" (out of scope) está tan claro como el "sí"; cada historia tiene
> criterios de aceptación verificables.

## 1. Resumen ejecutivo

Aprendamos es una webapp comunitaria para descubrir y compartir cursos gratuitos de distintas plataformas y proveedores. Los usuarios pueden consultar un catálogo comunitario de cursos validados, aportar nuevos cursos y organizar su aprendizaje mediante roadmaps personales. La plataforma incorpora validación por parte de un administrador para mantener la calidad de la información compartida. Su objetivo es facilitar el acceso a recursos educativos gratuitos y ayudar a las personas a planificar su formación.

## 2. Objetivos y métricas de éxito

| Objetivo | Cómo sabemos que lo logramos |
|----------|------------------------------|
| Que el catálogo comunitario tenga cursos validados de múltiples plataformas. | Al menos el 60 % de los aportes enviados termina validado y el catálogo incluye cursos de al menos 20 plataformas diferentes, con una variedad mínima de 10 categorías. |
| Que los usuarios utilicen los roadmaps para planificar su aprendizaje. | Al menos el 30 % de los usuarios registrados crea un roadmap con dos o más cursos ordenados. |
| Que los usuarios completen cursos y roadmaps personales. | Al menos el 40 % de los cursos agregados a roadmaps se marca como finalizado y al menos el 20 % de los usuarios que crean un roadmap lo completa. |



## 3. Personas

### Persona 1 — Estudiante

- **Contexto:** Persona que busca cursos gratuitos en Internet para aprender nuevos temas o profundizar sus conocimientos.
- **Motivaciones:** Encontrar cursos en un mismo lugar y organizar su aprendizaje mediante una secuencia de cursos.
- **Frustraciones hoy:** Los cursos están dispersos en distintas plataformas y le resulta difícil organizar cuáles quiere realizar y cuáles ya terminó.
- **Historias tipo:** 
-"Hace mucho tiempo que quiero aprender sobre programación y hay muchos cursos disponibles, no se por donde empezar, ni que curso tomar.
-"Quiero actualizarme en cursos de derecho de Familia, y no se cuales tomar"
-"Me encantaria hacer un curso de historia de la primera guerra mundial, pero nunca puedo pasar de 1914"

### Persona 2 — Administrador

- **Contexto:** Persona responsable de revisar los cursos aportados por la comunidad y decidir si cumplen los requisitos para incorporarse al catálogo.

- **Motivaciones:** Mantener un catálogo confiable, organizado y compuesto por cursos gratuitos que cumplan las condiciones establecidas

- **Frustraciones hoy:** Necesita revisar los aportes y comprobar que tengan información suficiente y enlaces válidos antes de publicarlos.

- **Historias tipo:**
-"Quiero consultar los cursos pendientes de validación para revisar los nuevos aportes."

-"Quiero aprobar o rechazar los cursos según los criterios establecidos para mantener la calidad del catálogo."

-"Quiero asegurarme de que solamente los cursos aprobados aparezcan en el catálogo comunitario."

## 4. User stories

> Mínimo 6 historias, al menos 4 con prioridad **P0** (P0 = el producto no funciona sin esto
> el día del MVP). Formato: **Como** [rol], **quiero** [acción], **para** [beneficio].
> Criterios de aceptación en formato Dado/Cuando/Entonces o checklist verificable.

| ID | Prioridad | Historia | Criterios de aceptación |
|----|-----------|----------|-------------------------|
| US-001 | P0 | Como visitante, quiero ver el catálogo comunitario paginado, para descubrir cursos sin registrarme. | - [ ] Puedo consultar el catálogo sin iniciar sesión.<br>- [ ] Se muestran hasta 20 cursos por página.<br>- [ ] Si hay más de 20 cursos, puedo navegar entre páginas.<br>- [ ] Si no hay cursos validados, se muestra un mensaje informativo. |
| US-002 | P0 | Como usuario registrado, quiero aportar un curso con sus metadatos, para enriquecer el catálogo comunitario. | - [ ] Puedo informar el enlace, categoría, tema, título, versión, año de edición, instructores o expositores y las características requeridas por la SPEC.<br>- [ ] Puedo declarar si realicé el curso.<br>- [ ] El sistema informa los campos obligatorios que falten.<br>- [ ] El aporte queda pendiente de validación. |
| US-003 | P0 | Como administrador, quiero aprobar o rechazar los cursos aportados, para mantener la calidad del catálogo. | - [ ] Puedo consultar los aportes pendientes.<br>- [ ] Puedo aprobar o rechazar cada aporte.<br>- [ ] Los cursos aprobados aparecen en el catálogo público.<br>- [ ] Los cursos pendientes o rechazados no aparecen en el catálogo público. |
| US-004 | P0 | Como usuario registrado, quiero crear un roadmap personal y agregar cursos validados en el orden que elija, para organizar mi aprendizaje. | - [ ] Puedo crear un roadmap.<br>- [ ] Puedo agregar cursos validados del catálogo.<br>- [ ] Puedo modificar el orden de los cursos.<br>- [ ] Puedo gestionar mis propios roadmaps. |
| US-005 | P0 | Como visitante, quiero registrarme e iniciar sesión, para acceder a las funcionalidades personales de Aprendamos. | - [ ] Puedo registrarme con email y contraseña.<br>- [ ] Puedo iniciar sesión con credenciales válidas.<br>- [ ] Si las credenciales son incorrectas, recibo un mensaje de error.<br>- [ ] Los intentos de inicio de sesión están sujetos a limitación de frecuencia. |
| US-006 | P0 | Como usuario, quiero recuperar mi contraseña, para volver a acceder a mi cuenta si la olvido. | - [ ] Puedo solicitar la recuperación mediante mi email.<br>- [ ] El proceso contempla un enlace o token de recuperación.<br>- [ ] Puedo establecer una nueva contraseña con un token válido.<br>- [ ] Un token inválido o vencido no permite cambiar la contraseña. |
| US-007 | P1 | Como visitante, quiero buscar y filtrar cursos, para encontrar los que se relacionan con mis intereses. | - [ ] Puedo buscar cursos por texto.<br>- [ ] Puedo filtrar por categoría y tema.<br>- [ ] Los resultados incluyen únicamente cursos validados.<br>- [ ] Los resultados mantienen la paginación. |
| US-008 | P1 | Como usuario registrado, quiero marcar cursos como finalizados y completar mi roadmap, para registrar mi progreso de aprendizaje. | - [ ] Puedo marcar un curso de mi roadmap como finalizado.<br>- [ ] Puedo identificar los cursos finalizados y pendientes.<br>- [ ] Un roadmap se considera completado cuando todos sus cursos están finalizados.<br>- [ ] Puedo consultar el estado de mi roadmap. |

## 5. Requisitos funcionales

| ID | Requisito | Historia relacionada |
|----|-----------|----------------------|
| RF-001 | El sistema permite registrar usuarios mediante email y contraseña. | US-005 |
| RF-002 | El sistema permite iniciar sesión y limita la frecuencia de intentos de autenticación. | US-005 |
| RF-003 | El sistema permite recuperar la contraseña mediante solicitud, enlace o token y establecimiento de una nueva contraseña. | US-006 |
| RF-004 | El sistema permite consultar el catálogo público de cursos validados sin iniciar sesión. | US-001 |
| RF-005 | El sistema permite aportar cursos gratuitos con los campos obligatorios establecidos en la SPEC de clase. | US-002 |
| RF-006 | El sistema permite declarar si el colaborador realizó el curso aportado. | US-002 |
| RF-007 | El sistema mantiene los aportes pendientes hasta su validación por un administrador. | US-003 |
| RF-008 | El sistema permite a los administradores aprobar o rechazar aportes. | US-003 |
| RF-009 | El sistema permite a los usuarios registrados crear y gestionar sus propios roadmaps personales. | US-004 |
| RF-010 | El sistema permite agregar cursos validados a un roadmap y modificar su orden. | US-004 |
| RF-011 | El sistema permite buscar cursos por texto y filtrarlos por categoría y tema. | US-007 |
| RF-012 | El sistema permite registrar la finalización de cursos y determinar si un roadmap está completado. | US-008 |

## 6. Requisitos no funcionales

| ID | Requisito | Notas |
|----|-----------|-------|
| RNF-001 | Todos los listados deben estar paginados. | Requisito heredado de la SPEC de clase. |
| RNF-002 | La interfaz debe aplicar un enfoque mobile-first con mejora progresiva. | Los estilos base no deben depender de media queries; las mejoras se incorporan mediante `@media (min-width: ...)`. |
| RNF-003 | La navegación debe incluir un menú tipo hamburguesa en dispositivos móviles. | Requisito heredado de la SPEC de clase. |
| RNF-004 | La organización del proyecto debe seguir Screaming Architecture. | La estructura debe reflejar los dominios funcionales de la aplicación. |
| RNF-005 | Las contraseñas deben almacenarse mediante hash seguro, como mínimo bcrypt. | Se podrá elegir una alternativa más fuerte si se justifica en TRD.md. |
| RNF-006 | El inicio de sesión debe contar con limitación de frecuencia de solicitudes. | Requisito heredado de la SPEC de clase. |
| RNF-007 | La interfaz debe seguir una estética inspirada en Google Material. | UX-UI.md deberá definir valores concretos de colores, tipografía, espaciado, bordes, sombras y estados de los componentes. |

## 7. Reglas de negocio

| ID | Regla | Fuente |
|----|-------|--------|
| BR-001 | Un curso aportado no aparece en el catálogo comunitario hasta ser validado. | SPEC de clase. |
| BR-002 | Quien aporta un curso debe declarar si lo realizó o no. | SPEC de clase. |
| BR-003 | Cada usuario gestiona sus propios roadmaps personales. | Decisión de producto. |
| BR-004 | Solo pueden incorporarse a los roadmaps cursos validados del catálogo comunitario. | Decisión de producto. |
| BR-005 | La validación y el rechazo de aportes son funciones exclusivas del administrador. | Decisión de producto. |
| BR-006 | El catálogo comunitario puede consultarse sin iniciar sesión. | Decisión de producto. |
| BR-007 | Los cursos aportados deben ser gratuitos y contar con un enlace activo. | SPEC de clase. |
| BR-008 | Un roadmap se considera completado cuando todos los cursos que contiene fueron marcados como finalizados. | Decisión de producto. |

## 8. Fuera de alcance (out of scope)

- Crear y alojar cursos propios dentro de Aprendamos.
- Incorporar cuestionarios o exámenes propios para evaluar a los usuarios.
- Cobrar por cursos o implementar pagos.
- Emitir certificados propios de finalización.
- Desarrollar aplicaciones móviles nativas.
- Importar cursos automáticamente desde plataformas externas.
- Incorporar funciones sociales como mensajería privada, foros o seguimiento de otros usuarios.

## 9. Supuestos y decisiones sobre la SPEC de clase

- **Roles:** se definen dos roles, usuario registrado y administrador. El administrador cuenta con permisos adicionales para validar aportes. Detalle en [SPEC refinada](SPEC.md).
- **Catálogo público:** se permite consultar los cursos validados sin iniciar sesión. Para aportar cursos y gestionar roadmaps se requiere una cuenta. Detalle en [SPEC refinada](SPEC.md).
- **Roadmaps personales:** cada usuario puede agregar cursos validados y ordenarlos según su secuencia de aprendizaje. Detalle en [SPEC refinada](SPEC.md).
- **Búsqueda:** se contempla búsqueda por texto y filtros por categoría y tema. Detalle en [SPEC refinada](SPEC.md).
- **Recuperación de contraseña:** se implementa el ciclo completo de solicitud, enlace o token y establecimiento de una nueva contraseña. Detalle en [SPEC refinada](SPEC.md).
- **Finalización:** se permite marcar cursos como finalizados y considerar completado un roadmap cuando todos sus cursos estén finalizados. Esta decisión permite medir los indicadores de éxito definidos en el PRD.

## 10. Preguntas abiertas

| Pregunta | Impacto | Estado |
|----------|---------|--------|
| ¿Qué criterios concretos debe verificar el administrador antes de aprobar un curso? | Alto: afecta la consistencia del catálogo. | Abierta |
| ¿Qué datos adicionales, además del email y la contraseña, serán obligatorios durante el registro? | Medio: afecta el formulario de registro. | Abierta |
| ¿Cuál será el plazo de vencimiento de los enlaces o tokens de recuperación de contraseña? | Medio: afecta la recuperación de cuentas. | Pendiente de definición en TRD.md |
| ¿Qué tamaño de página se utilizará para los listados? | Bajo: afecta la navegación del catálogo. | Propuesta: 20 elementos por página. |

---

**Referencias:**
- Atlassian — Plantilla PRD: https://www.atlassian.com/software/confluence/templates/product-requirements
- Lenny Rachitsky — Plantilla de requirements: https://www.atlassian.com/software/confluence/templates/requirements
