const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const rutasTareas = require('./routes/tareas');
const rutasMetas = require('./routes/metas');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "ToDo2026";

// Conexión a la base de datos al iniciar backend.
const MONGO_URI = "mongodb://127.0.0.1:27017/todolist"; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conexión exitosa a MongoDB."))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

const validarApiKey = (req, res, next) => {
  const key = req.headers['authorization'];
  if (key === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "API Key inválida" });
  }
};

app.use(validarApiKey);

app.use(rutasTareas);
app.use(rutasMetas);

app.listen(port, () => {
  console.log(`Servidor de la Actividad 5 corriendo en http://localhost:${port}`);
});