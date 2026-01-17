# Guía de Despliegue en Render.com

Render es una plataforma excelente para desplegar aplicaciones Node.js fácilmente. Sigue estos pasos para llevar tu "Biblioteca Backend" a producción.

## 1. Preparativos

1. Sube tu código a **GitHub** (o GitLab).
   - Asegúrate de que `node_modules` y `.env` estén en el `.gitignore` (¡no subas tus secretos ni librerías!).
   - Tu `package.json` debe tener un script de start. Agrega esto si no está:
     ```json
     "scripts": {
       "start": "node app.js",
       "seed": "node seed.js"
     }
     ```

## 2. Crear Mongo Atlas (Base de Datos en la Nube)

Render no aloja la BD por defecto, usaremos MongoDB Atlas (gratis).
1. Crea cuenta en MongoDB Atlas.
2. Crea un Cluster (Shared/Free).
3. Entra a **Database Access**: Crea un usuario base de datos (ej: `admin`) con su contraseña.
4. Entra a **Network Access**: Permite acceso desde cualquier IP (`0.0.0.0/0`) para que Render pueda conectar.
5. Botón **Connect** -> "Drivers" -> Copia el "Connection String". Será algo como:
   `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/biblioteca?retryWrites=true&w=majority`

## 3. Configurar en Render

1. Crea cuenta en [Render.com](https://render.com).
2. Haz clic en **"New" -> "Web Service"**.
3. Conecta tu repositorio de GitHub.

## 4. Configuración del Servicio

Rellena el formulario:

- **Name**: `biblioteca-backend` (o lo que quieras).
- **Environment**: `Node`.
- **Region**: Frankfurt (o la más cercana).
- **Branch**: `main` (o master).
- **Build Command**: `npm install`
  - Esto instala las dependencias en el servidor de Render.
- **Start Command**: `node app.js` (o `npm start`)
  - Esto arranca tu aplicación.

## 5. Variables de Entorno (Environment Variables)

Esto es CRÍTICO. Aquí ponemos los secretos que estaban en `.env`.
Busca la sección "Environment Variables" o "Advanced" -> "Add Environment Variable":

1. Key: `MONGO_URI`
   Value: (Pega tu cadena de conexión de Atlas aquí. **Reemplaza `<password>`** por tu contraseña real).
   
2. Key: `JWT_SECRET`
   Value: (Inventa una frase larga y segura).

3. Key: `PORT` (Opcional, Render suele ponerlo automático, pero tu código usa `process.env.PORT` así que está perfecto).

## 6. Desplegar

1. Haz clic en **"Create Web Service"**.
2. Espera a que termine el despliegue. Verás logs en tiempo real.
3. Cuando diga "Live", tendrás una URL tipo `https://biblioteca-backend-xyz.onrender.com`.

### Poblar la base de datos (Seed)
Para tener los libros iniciales, puedes ejecutar el seed como un "Job" o comando puntual en la consola de Render (Shell), o simplemente conectarte desde tu PC a la base de datos de producción (cambiando tu .env local temporalmente) y ejecutar `node seed.js`.
¡Listo! Tu API está online.
