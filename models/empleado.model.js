const { getDB } = require('../config/db');

const Empleado = {
  // Buscar un empleado por usuario y contraseña
  findByCredentials: async (usuario, contrasena) => {
    const db = getDB();
    const [rows] = await db.execute(
      'SELECT * FROM empleado WHERE USUARIO = ? AND PASSWORD = ?',
      [usuario, contrasena]
    );
    return rows[0]; // Si existe, retorna el empleado, si no, undefined
  },

  // Puedes agregar más funciones aquí si las necesitas (crear, actualizar, etc.)
};

module.exports = Empleado;
