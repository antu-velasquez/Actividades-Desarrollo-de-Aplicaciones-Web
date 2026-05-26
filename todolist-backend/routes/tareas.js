const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const TareaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  dueDate: { type: String, default: "" }
}, { versionKey: false });

const Tarea = mongoose.model('Tarea', TareaSchema);

router.get('/getTasks', async (req, res) => {
  try {
    const listaTareas = await Tarea.find();
    res.status(200).json(listaTareas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

router.post('/addTask', async (req, res) => {
  const { task, description, dueDate } = req.body;
  
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Falta el título de la tarea" });
  }

  try {
    const nuevaTarea = await Tarea.create({
      title: task,
      description: description || "",
      dueDate: dueDate || ""
    });
    res.status(200).json({ message: "Tarea guardada con éxito", tarea: nuevaTarea });
  } catch (err) {
    res.status(500).json({ error: "Error al guardar la tarea" });
  }
});

router.delete('/removeTask', async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: "ID no proporcionado" });
  }

  try {
    const resultado = await Tarea.findByIdAndDelete(id);
    if (resultado) {
      res.status(200).json({ message: "Tarea eliminada" });
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (err) {
    res.status(400).json({ error: "Formato de ID inválido" });
  }
});

module.exports = router;