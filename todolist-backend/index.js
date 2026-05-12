const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "ToDo2026";

let tareas = [{ id: 1, title: "Ejemplo de tarea" }];
let metas = [{ id: 1, title: "Ejemplo de meta" }];

const validarApiKey = (req, res, next) => {
  const key = req.headers['authorization'];
  if (key === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "API Key inválida" });
  }
};

app.get('/getTasks', validarApiKey, (req, res) => {
  res.status(200).json(tareas);
});

app.get('/getGoals', validarApiKey, (req, res) => {
  res.status(200).json(metas);
});

app.post('/addTask', validarApiKey, (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Falta la tarea" });
  }
  const nuevaTarea = { id: Date.now(), title: task };
  tareas.push(nuevaTarea);
  res.status(200).json({ message: "Tarea guardada con éxito", tarea: nuevaTarea });
});

app.post('/addGoal', validarApiKey, (req, res) => {
  const { goal } = req.body;
  if (!goal || goal.trim() === "") {
    return res.status(400).json({ error: "Falta la meta" });
  }
  const nuevaMeta = { id: Date.now(), title: goal };
  metas.push(nuevaMeta);
  res.status(200).json({ message: "Meta guardada con éxito", meta: nuevaMeta });
});

app.delete('/removeTask', validarApiKey, (req, res) => {
  const { id } = req.body;
  const index = tareas.findIndex(t => t.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
    res.status(200).json({ message: "Tarea eliminada" });
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

app.delete('/removeGoal', validarApiKey, (req, res) => {
  const { id } = req.body;
  const index = metas.findIndex(m => m.id === id);
  if (index !== -1) {
    metas.splice(index, 1);
    res.status(200).json({ message: "Meta eliminada" });
  } else {
    res.status(404).json({ error: "Meta no encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Servidor ToDo corriendo en http://localhost:${port}`);
});