console.log('📦 hotel.admin.routes.js cargado');

const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel.model'); // Asegúrate de tener el modelo de Hotel

// Ruta principal del panel de administración
router.get('/', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login'); // Redirige a la página de login si no está logueado
  }
  res.render('panelAdmin', { usuario: req.session.usuario });
});

// Ruta para obtener habitaciones
router.get('/habitaciones', async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }

  try {
    const habitaciones = await Hotel.getAll(); // Obtiene los datos de las habitaciones
    res.render('partials/habitaciones', { habitaciones });
  } catch (err) {
    console.error('❌ Error al obtener habitaciones:', err);
    res.status(500).send('Error al obtener habitaciones');
  }
});

// Ruta para gestionar empleados
router.get('/empleados', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login'); // Redirige si no está logueado
  }
  // Aquí puedes agregar la lógica para obtener los empleados desde la base de datos
  res.render('partials/empleados'); // Renderiza la vista parcial de empleados
});

// Ruta para gestionar huéspedes
router.get('/huespedes', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login'); // Redirige si no está logueado
  }
  // Aquí puedes agregar la lógica para obtener los huéspedes desde la base de datos
  res.render('partials/huespedes'); // Renderiza la vista parcial de huéspedes
});

module.exports = router;