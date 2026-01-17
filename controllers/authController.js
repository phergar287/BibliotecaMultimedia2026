const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Autenticar usuario y obtener token
// @route   POST /login
// @access  Public
const login = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        // Buscar por nombre
        const user = await User.findOne({ nombre });

        // Verificar usuario y contraseña
        if (user && (await user.matchPassword(password))) {
            res.json({
                mensaje: "Login correcto",
                token: generateToken(user._id), // Ahora devolvemos un token real JWT
                // nombre: user.nombre, // Opcional
            });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

module.exports = { login };
