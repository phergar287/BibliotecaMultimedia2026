const express = require('express');
const app = express();

app.use(express.json());

// ------------------------------
// Datos simulados
// ------------------------------
const usuarios = [
  { nombre: "ana", password: "1234" },
  { nombre: "pepe", password: "abcd" }
];

// 10 libros simulados
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

// Token simulado (no caduca, no es JWT)
const TOKEN_VALIDO = "Bearer TOKEN_SUPER_SECRETO_123";

// ------------------------------
// Endpoint de login
// ------------------------------
app.post('/login', (req, res) => {
  const { nombre, password } = req.body;

  const usuario = usuarios.find(
    u => u.nombre === nombre && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }

  // Devolvemos un token simulado
  res.json({
    mensaje: "Login correcto",
    token: TOKEN_VALIDO
  });
});

// ------------------------------
// Ruta protegida (sin middleware)
// ------------------------------
app.get('/libros', (req, res) => {
  const token = req.headers.authorization;

  // Comprobación simple del “token” enviado
  if (token !== TOKEN_VALIDO) {
    console.log(token);
    return res.status(403).json({ mensaje: "Token inválido o ausente" });
  }

  // Si el token es correcto, devolvemos los 10 libros
  res.json(libros);
});

// ------------------------------
// Arrancar servidor
// ------------------------------
app.listen(3000, () => console.log("Servidor arrancado en http://localhost:3000"));
