const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const { connectDB } = require('./config/db');

// Rutas
const hotelRoutes = require('./routes/hotel.routes');
const hotelAuthRoutes = require('./routes/hotel.auth.routes');
const hotelAdminRoutes = require('./routes/hotel.admin.routes');

const port = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'secreto_hotel',
  resave: false,
  saveUninitialized: true
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Rutas
app.use('/', hotelRoutes);
app.use('/auth', hotelAuthRoutes);
app.use('/admin', hotelAdminRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;