console.log('📦 hotel.auth.routes.js cargado');

const express = require('express');
const router = express.Router();
const Empleado = require('../models/empleado.model'); // Asegúrate de tener el modelo

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    // Verifica las credenciales del empleado
    const empleado = await Empleado.findByCredentials(usuario, contrasena);
    if (empleado) {
      // Guarda los datos del usuario en la sesión
      req.session.usuario = empleado.USUARIO;
      req.session.rol = empleado.ROL;
      req.session.nombre = empleado.NOMBRE_COMPLETO;
      req.session.id = empleado.idEMPLEADO;
      req.session.logged_in = true;

      // Redirige al panel de administración
      res.redirect('/admin');
    } else {
      // Renderiza la vista de login con un mensaje de error
      res.render('login', { error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('❌ Error al iniciar sesión:', err);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('❌ Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/'); // Redirige a la página principal
  });
});

module.exports = router;