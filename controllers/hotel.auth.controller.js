const db = require('../config/db');
const bcrypt = require('bcrypt'); // opcional si en el futuro usas contraseñas cifradas

const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM empleado WHERE Usuario = ? AND Password = ?',
      [usuario, password]  // si usas bcrypt, cambia esta lógica
    );

    if (rows.length === 1) {
      const user = rows[0];
      req.session.usuario = user.USUARIO;
      req.session.rol = user.ROL;
      req.session.nombre_completo = user.NOMBRE_COMPLETO;
      req.session.idEmpleado = user.idEMPLEADO;
      req.session.logged_in = true;

      if (user.ROL === 'ADMIN') {
        res.redirect('/panelAdmin');
      } else if (user.ROL === 'EMPLEADO') {
        res.redirect('/panelEmpleado');
      } else {
        res.status(403).send('Rol no autorizado');
      }
    } else {
      res.send(`<script>alert('Acceso denegado. Usuario o contraseña incorrectos'); window.location.href='/log-in';</script>`);
    }

    connection.release();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = { login };
