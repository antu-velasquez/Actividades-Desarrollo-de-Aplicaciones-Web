# Actividad 5: Conexión a base de datos + CRUD (Create + Read + Delete).

Servidor para manejar el listado de tareas y metas personales con persistencia de datos NoSQL mediante MongoDB.

## Ejecución:
1. Instalar dependencias: `npm install` (incluye Express, Cors y Mongoose).
2. Asegurar que el servicio local de MongoDB esté activo (`localhost:27017`).
3. Iniciar servidor: `node index.js`.
4. **Importante:** Para permitir la comunicación entre PlayCode (HTTPS) y el servidor local (HTTP), ocasionalmente es necesario habilitar el "Contenido no seguro" en la configuración del navegador.

## Endpoints:
* **Tareas:** `GET /getTasks` (obtener de la BD), `POST /addTask` (insertar con todos sus atributos), `DELETE /removeTask` (eliminar por ID de la BD).  
* **Metas:** `GET /getGoals` (obtener de la BD), `POST /addGoal` (insertar con todos sus atributos), `DELETE /removeGoal` (eliminar por ID de la BD). 

## Características:
* **Seguridad:** Uso de API Key (`Authorization: ToDo2026`). Retorna **Status 401** si es incorrecta.
* **Validación:** Retorna **Status 400** ante parámetros incorrectos o IDs inválidos al agregar o eliminar.
* **Persistencia NoSQL:** Conexión automática al arrancar el backend mediante Mongoose hacia la base de datos local `todolist`.
* **CORS:** Configurado para permitir peticiones desde entornos externos como PlayCode.

## Enlace del proyecto en Playcode:
https://playcode.io/to-do-list--019dcc6b-dded-72fc-acb2-5423bec8a2b1

**Autor:** Antulio Velasquez.