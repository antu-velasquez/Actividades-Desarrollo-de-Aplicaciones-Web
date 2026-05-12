# Actividad 4: Métodos HTTP REST.

Servidor para manejar el listado de tareas y metas personales con validación de estados HTTP.

## Ejecución:
1. Instalar dependencias: `npm install`.
2. Iniciar servidor: `node index.js`.
3. **Importante:** Para permitir la comunicación entre PlayCode (HTTPS) y el servidor local (HTTP), ocasionalmente es necesario habilitar el "Contenido no seguro" en la configuración del navegador.

## Endpoints:
* **Tareas:** `GET /getTasks`, `POST /addTask`, `DELETE /removeTask`.  
* **Metas:** `GET /getGoals`, `POST /addGoal`, `DELETE /removeGoal`. 

## Características:
* **Seguridad:** Uso de API Key (`Authorization: ToDo2026`). Retorna **Status 401** si es incorrecta.
* **Validación:** Retorna **Status 400** ante parámetros incorrectos o campos vacíos al agregar o eliminar.
* **Respuestas exitosas:** Retorna **Status 200** en todas las operaciones satisfactorias.
* **CORS:** Configurado para permitir peticiones desde entornos externos como PlayCode.
* **Almacenamiento:** Los datos se manejan en arreglos. No existe persistencia en base de datos.

## Enlace del proyecto en Playcode:
https://playcode.io/to-do-list--019dcc6b-dded-72fc-acb2-5423bec8a2b1

**Autor:** Antulio Velasquez.