const { getDB } = require('../config/db'); // Asegúrate de importar correctamente la función

class Hotel {
  // Obtener todas las habitaciones
  static async getAll() {
    const db = getDB(); // Obtener la conexión
    const [rows] = await db.query('SELECT * FROM HABITACIONES');
    return rows;
  }

  // Crear una nueva habitación
  static async create({ nombre, capacidad, imagen }) {
    const db = getDB(); // Obtener la conexión
    await db.query(
      'INSERT INTO HABITACIONES (NOMBRE, CAPACIDAD, IMAGEN) VALUES (?, ?, ?)',
      [nombre, capacidad, imagen]
    );
  }

  // Actualizar una habitación existente
  static async update(id, { nombre, capacidad, imagen }) {
    const db = getDB(); // Obtener la conexión
    await db.query(
      'UPDATE HABITACIONES SET NOMBRE = ?, CAPACIDAD = ?, IMAGEN = ? WHERE id = ?',
      [nombre, capacidad, imagen, id]
    );
  }

  // Eliminar una habitación
  static async delete(id) {
    const db = getDB(); // Obtener la conexión
    await db.query('DELETE FROM HABITACIONES WHERE id = ?', [id]);
  }
}

module.exports = Hotel;

