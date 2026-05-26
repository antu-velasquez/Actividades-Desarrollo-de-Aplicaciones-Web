require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const rutasTareas = require('./routes/tareas');
const rutasMetas = require('./routes/metas');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión exitosa a MongoDB."))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

const validarApiKey = (req, res, next) => {
  const key = req.headers['authorization'];
  if (key === process.env.API_KEY) {
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