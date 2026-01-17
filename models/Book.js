const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    fechaPrestamo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);
