# Actividad 6: Docker e Integración Backend + Frontend.

To-Do List Full-Stack para gestionar tareas y metas con interfaz interactiva y persistencia de datos.

## Estructura:
* **`todolist-backend`:** API en Node.js + Express conectada a MongoDB.
* **`todolist-frontend`:** Interfaz en React con Bootstrap y Redux Toolkit.

## Ejecución local:

### 1. Backend (puerto 3000):
1. Activar MongoDB local (`localhost:27017`).
2. En la carpeta: `cd todolist-backend` -> arrancar con `node index.js`.

### 2. Frontend (puerto 5173):
1. En otra terminal: `cd todolist-frontend`.
2. Iniciar con `npm run start` (o `npx vite --force` ante bloqueos).
3. Abrir: `http://localhost:5173/`.

## Características:
* **CRUD Real:** Persistencia directa de tareas y metas en la base de datos.
* **Redux Toolkit:** Estado global centralizado y sincronizado mediante un `store`.
* **Diseño e Interfaz:** Entorno responsivo con Bootstrap.
* **Seguridad:** Peticiones protegidas mediante API Key (`Authorization: ToDo2026`).

**Autor:** Antulio Velasquez.