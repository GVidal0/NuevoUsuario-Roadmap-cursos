# Aprendamos

## Requisitos

- Docker Desktop.
- Docker Compose.

## Cómo levantar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/GVidal0/NuevoUsuario-Roadmap-cursos.git
cd NuevoUsuario-Roadmap-cursos
```

Crear el archivo de variables de entorno:

```bash
cp .env.example .env
```

Construir las imágenes e iniciar los servicios:

```bash
docker compose up --build
```

## Accesos

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000
- **Health check:** http://localhost:8000/health

## Detener los servicios

```bash
docker compose down
```

Los datos de PostgreSQL se conservan en el volumen nombrado `postgres_data`.
