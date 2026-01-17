const Book = require('../models/Book');

// @desc    Obtener todos los libros
// @route   GET /libros
// @access  Private
const getBooks = async (req, res) => {
    try {
        // Buscar los primeros 10 libros (o todos si son pocos)
        const books = await Book.find().limit(10);
        res.json(books);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener libros' });
    }
};

module.exports = { getBooks };
