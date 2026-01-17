# Guía de Arquitectura Backend con Node y Mongo

Esta guía está diseñada para entender cómo organizar y construir una aplicación backend profesional.

## 1. MongoDB y Mongoose

### ¿Qué es MongoDB?
MongoDB es una base de datos **NoSQL** orientada a documentos. A diferencia de SQL, guardamos datos en documentos tipo JSON (BSON) dentro de colecciones, lo que la hace muy flexible para apps con JavaScript.

### Instalación y Uso
Puedes instalar MongoDB localmente (Community Server) o usar **MongoDB Atlas**, que es un servicio en la nube (la opción recomendada para producción).

### Mongoose
Es una librería (ODM) que nos facilita interactuar con MongoDB desde Node.js.
- Nos permite definir **Schemas** (estructuras) para nuestros datos.
- Ofrece métodos sencillos como `.find()`, `.save()`, `.create()`.

**Conexión típica:**
```javascript
mongoose.connect(process.env.MONGO_URI);
```

---

## 2. Estructura Node + Express (MVC)

Separamos el código para que sea mantenible y escalable. No queremos un archivo `back.js` gigante de 2000 líneas.

### Estructura de Carpetas

- **`/models`**: Define la ESTRUCTURA de los datos.
  - Ejemplo: `User.js` define que un usuario tiene `nombre` y `password`.
  - *Analogía*: Es el plano del edificio.

- **`/controllers`**: Contiene la LÓGICA principal. Aquí va el "qué hace" tu app.
  - Ejemplo: "Buscar usuario, comprobar clave, generar token".
  - *Analogía*: Es el gerente que toma decisiones.

- **`/routes`**: Define las RUTAS (URLs).
  - Simplemente dice: "Cuando alguien pida POST /login, llama al controlador X".
  - *Analogía*: Es el recepcionista que dirige a la gente a la oficina correcta.

- **`/middleware`**: Funciones que se ejecutan "en medio" de la petición.
  - Ejemplo: Verificar token, logs, validaciones.
  - *Analogía*: Es el guardia de seguridad en el pasillo.

- **`/config`**: Configuraciones de la app (BD, variables de terceros).

---

## 3. Middleware de Autenticación (`protect`)

El middleware intercepta la petición ANTES de que llegue al controlador final.

### Funcionamiento Paso a Paso:

1. **Interceptar**: El usuario pide `GET /libros`. Express ve que esta ruta tiene un middleware `protect`.
2. **Leer Header**: Buscamos la cabecera `Authorization`. Debería decir `Bearer <token>`.
3. **Extraer**: Sacamos el token string.
4. **Verificar**: Usamos `jwt.verify(token, secreto)` para ver si es válido y no ha expirado.
5. **Decisión**:
   - Si es válido: Llamamos a `next()` -> Pasa al controlador `getBooks`.
   - Si no es válido: Respondemos con Error 401/403 -> Se corta la petición.

---

## 4. Paso a Paso: Construyendo el Backend

1. **Inicialización**: Crear proyecto (`npm init`), instalar `express`, `mongoose`, etc.
2. **Configuración DB**: Crear archivo de conexión a Mongo.
3. **Modelos**: Diseñar qué datos vamos a guardar (`User`, `Book`).
4. **Lógica (Controladores)**: Escribir funciones vacías y luego rellenarlas con lógica real (consultas a BD).
5. **Rutas**: Enlazar URL -> Controlador.
6. **Seguridad**: Añadir autenticación con JWT y middlewares.
7. **Punto de Entrada**: Unir todo en `app.js`.

---
*¡Con esta estructura tienes una base sólida para crecer a cualquier tamaño!*
