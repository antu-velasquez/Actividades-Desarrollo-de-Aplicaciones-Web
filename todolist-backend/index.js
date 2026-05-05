const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let goals = [];

const API_KEY = "ToDo2026";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Acceso no autorizado. API Key inválida.' });
  }
};

app.use(authMiddleware);

app.get('/getTasks', (req, res) => {
  res.json(tasks);
});

app.get('/getGoals', (req, res) => {
  res.json(goals);
});

app.post('/addTask', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Falta la tarea' });
  
  const newTask = { id: Date.now(), title: task };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.post('/addGoal', (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ error: 'Falta la meta' });

  const newGoal = { id: Date.now(), title: goal };
  goals.push(newGoal);
  res.status(201).json(newGoal);
});

app.delete('/removeTask', (req, res) => {
  const { id } = req.body;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Tarea eliminada' });
});

app.delete('/removeGoal', (req, res) => {
  const { id } = req.body;
  goals = goals.filter(g => g.id !== id);
  res.json({ message: 'Meta eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});