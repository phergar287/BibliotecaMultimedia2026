require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');
const connectDB = require('./config/database');

const usuarios = [
    { nombre: "ana", password: "1234" },
    { nombre: "pepe", password: "abcd" }
];

const libros = [
    { titulo: "El Quijote", autor: "Cervantes", isbn: "1111", fechaPrestamo: "2025-01-02" },
    { titulo: "Cien años de soledad", autor: "G. Márquez", isbn: "2222", fechaPrestamo: "2025-01-03" },
    { titulo: "La sombra del viento", autor: "Zafón", isbn: "3333", fechaPrestamo: "2025-01-04" },
    { titulo: "1984", autor: "Orwell", isbn: "4444", fechaPrestamo: "2025-01-05" },
    { titulo: "El principito", autor: "Saint-Exupéry", isbn: "5555", fechaPrestamo: "2025-01-06" },
    { titulo: "Rayuela", autor: "Cortázar", isbn: "6666", fechaPrestamo: "2025-01-07" },
    { titulo: "Hamlet", autor: "Shakespeare", isbn: "7777", fechaPrestamo: "2025-01-08" },
    { titulo: "Fahrenheit 451", autor: "Bradbury", isbn: "8888", fechaPrestamo: "2025-01-09" },
    { titulo: "Ulises", autor: "Joyce", isbn: "9999", fechaPrestamo: "2025-01-10" },
    { titulo: "El nombre de la rosa", autor: "Eco", isbn: "1010", fechaPrestamo: "2025-01-11" }
];

const importarDatos = async () => {
    try {
        await connectDB();

        // Limpiar base de datos
        await User.deleteMany();
        await Book.deleteMany();

        console.log('Datos antiguos eliminados...');

        // Insertar usuarios (el middleware 'pre save' hasheará las contraseñas)
        // No podemos usar insertMany directamente si queremos que corra el middleware de mongoose save()
        // A menos que insertMany lo soporte o creemos instancias uno a uno.
        // InsertMany NO ejecuta 'save' hooks por defecto en algunas versiones, 
        // pero para hashing con pre-save es mejor crear uno a uno o usar Promise.all.

        // Método seguro para que se ejecuten los hooks:
        for (const u of usuarios) {
            const user = new User(u);
            await user.save();
        }

        // Insertar libros
        await Book.insertMany(libros);

        console.log('¡Datos Importados Correctamente!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

importarDatos();
