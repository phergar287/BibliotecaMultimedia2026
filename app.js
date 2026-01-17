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

// Debug request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rutas
const path = require('path');

// Rutas de API
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/bookRoutes'));

// Servir archivos estáticos del frontend (Angular)
// Nota: 'biblioteca-front' es el nombre por defecto, lo ajustaremos si es necesario al crear el proyecto
app.use(express.static(path.join(__dirname, 'frontend/dist/biblioteca-front/browser')));

// Cualquier otra ruta que no sea API, devuelve el index.html (SPA)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/biblioteca-front/browser/index.html'));
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
