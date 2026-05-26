const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const MetaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  dueDate: { type: String, default: "" }
}, { versionKey: false });

const Meta = mongoose.model('Meta', MetaSchema);

router.get('/getGoals', async (req, res) => {
  try {
    const listaMetas = await Meta.find();
    res.status(200).json(listaMetas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las metas" });
  }
});

router.post('/addGoal', async (req, res) => {
  const { goal, description, dueDate } = req.body;
  
  if (!goal || goal.trim() === "") {
    return res.status(400).json({ error: "Falta el título de la meta" });
  }

  try {
    const nuevaMeta = await Meta.create({
      title: goal,
      description: description || "",
      dueDate: dueDate || ""
    });
    res.status(200).json({ message: "Meta guardada con éxito", meta: nuevaMeta });
  } catch (err) {
    res.status(500).json({ error: "Error al guardar la meta" });
  }
});

router.delete('/removeGoal', async (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: "ID no proporcionado" });
  }

  try {
    const resultado = await Meta.findByIdAndDelete(id);
    if (resultado) {
      res.status(200).json({ message: "Meta eliminada" });
    } else {
      res.status(404).json({ error: "Meta no encontrada" });
    }
  } catch (err) {
    res.status(400).json({ error: "Formato de ID inválido" });
  }
});

module.exports = router;