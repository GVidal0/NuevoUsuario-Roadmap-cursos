# Changelog

Todos los cambios importantes de este proyecto se documentarán en este archivo.

El formato sigue las recomendaciones de Keep a Changelog.

## [v0.1.0] - 2026-10-27

### Added
- Estructura inicial del proyecto según el TRD.
- Backend mínimo con FastAPI.
- Endpoint `GET /health` para verificar el estado del backend.
- Endpoint `GET /cursos` como punto de partida para el catálogo.
- Frontend mínimo con React, TypeScript y Vite.
- Consulta del endpoint de cursos desde el frontend.
- Entorno de desarrollo con Docker Compose y tres servicios: PostgreSQL 18.6, backend y frontend.
- Volumen nombrado para persistencia de datos de PostgreSQL.
- Dockerfile y `.dockerignore` para backend y frontend.
- Instrucciones para levantar el entorno desde una máquina limpia.

### Changed
- Configuración del proxy de Vite para permitir la comunicación con el backend tanto en desarrollo local como dentro de Docker.
