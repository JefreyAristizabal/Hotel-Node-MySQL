console.log('📦 hotel.routes.js cargado');

const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel.model'); // Modelo de Hotel

// Ruta principal: muestra todas las habitaciones
router.get('/', async (req, res) => {
  try {
    const habitaciones = await Hotel.getAll(); // Obtiene todas las habitaciones
    res.render('index', { habitaciones }); // Renderiza la vista 'index' con los datos
  } catch (err) {
    console.error('❌ Error al obtener habitaciones:', err);
    res.status(500).send('Error al obtener habitaciones');
  }
});

module.exports = router;