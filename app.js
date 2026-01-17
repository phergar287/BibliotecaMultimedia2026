require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Conectar a Base de Datos
connectDB();

const app = express();

// Middlewares Globales
app.use(cors()); // Habilita CORS por si el front lo necesita
app.use(express.json()); // Parsea body JSON

// Rutas
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/bookRoutes'));

// Manejo de errores básico (404)
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
