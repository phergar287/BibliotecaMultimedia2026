const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtener el token del header (formato: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Añadir el usuario a la request (opcional, si quisiéramos usarlo luego)
            req.user = decoded;

            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ mensaje: 'Token inválido', error: error.message });
        }
    }

    if (!token) {
        res.status(403).json({ mensaje: 'Token no autorizado o ausente' });
    }
};

module.exports = { protect };
