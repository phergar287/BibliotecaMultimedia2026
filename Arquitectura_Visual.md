# Arquitectura Visual del Proyecto y Despliegue

Este documento proporciona una visión gráfica y clara de cómo está construido tu backend y cómo fluye la información desde tu entorno local hasta la nube.

## 1. Arquitectura del Proyecto (Node + Express + Mongo)

Este diagrama muestra cómo se relacionan los ficheros en tu carpeta `Desktop/Multimedia/BackBiblioteca`.

```mermaid
graph TD
    classDef nodejs fill:#6cc24a,stroke:#333,stroke-width:2px,color:white;
    classDef express fill:#000000,stroke:#333,stroke-width:2px,color:white;
    classDef mongo fill:#4DB33D,stroke:#333,stroke-width:2px,color:white;
    classDef file fill:#f9f9f9,stroke:#333,stroke-width:1px;

    Client[🖥️ Cliente / Frontend] -->|Petición HTTP| App(app.js):::nodejs
    
    subgraph "Backend (Tu Ordenador/Render)"
        App -->|Config| ConnectDB(config/database.js):::file
        App -->|Usa| Middleware(middleware/):::file
        App -->|Define| Routes(routes/):::express
        
        Routes -->|Llama a| Controllers(controllers/):::file
        Controllers -->|Consulta| Models(models/):::file
    end

    subgraph "Base de Datos (Nube)"
        ConnectDB -.->|Conexión Mongoose| Atlas[(MongoDB Atlas)]:::mongo
        Models -.->|Query/Save| Atlas
    end

    linkStyle 0 stroke:#6cc24a,stroke-width:2px;
```

### Explicación del Flujo
1.  **Client**: El usuario o frontend hace una petición (ej. Login o Pedir Libros).
2.  **app.js**: Es la puerta de entrada. Configura Express, conecta con la BD y carga las rutas.
3.  **Routes**: Deciden a dónde ir según la URL (ej. `/login` o `/libros`).
4.  **Controllers**: Es el "cerebro". Recibe los datos, piensa qué hacer y responde.
5.  **Models**: Definen la *forma* de los datos (Schema) y hablan directamente con MongoDB Atlas.
6.  **Atlas**: Es donde realmente se guardan los datos en la nube.

---

## 2. Flujo de Despliegue (Deploy) a Render

Este diagrama explica qué pasa "mágicamente" cuando subes tu código.

```mermaid
sequenceDiagram
    actor Tu as 👩‍💻 Tú (Local)
    participant GitHub as 🐙 GitHub
    participant Render as ☁️ Render
    participant Atlas as 🍃 MongoDB Atlas

    Note over Tu, GitHub: Fase 1: Subida de Código
    Tu->>Tu: git add .
    Tu->>Tu: git commit -m "cambios"
    Tu->>GitHub: git push origin main
    
    Note over GitHub, Render: Fase 2: Automatización
    GitHub->>Render: ¡Aviso! Nuevo código detectado (Webhook)
    activate Render
    Render->>GitHub: Descarga el último commit
    Render->>Render: Ejecuta 'npm install' (Instala dependencias)
    
    Note over Render, Atlas: Fase 3: Conexión y Arranque
    Render->>Render: Lee Variables de Entorno (MONGO_URI)
    Render->>Atlas: Intenta conectar (mongoose.connect)
    
    alt Conexión Exitosa
        Atlas-->>Render: ✅ OK
        Render->>Render: Inicia Servidor (node app.js)
        Render-->>Tu: Tu web está ONLINE 🚀
    else Error
        Atlas-->>Render: ❌ Fallo Auth/IP
        Render-->>Tu: Error en el log (Deploy Failed)
    end
    deactivate Render
```

## 3. Guía Visual de Conexión (Atlas <-> Render)

Para que Render pueda hablar con Atlas, necesitas configurar la **Variable de Entorno**. Es como darle la llave de casa.

```mermaid
flowchart LR
    subgraph Atlas [🍃 MongoDB Atlas]
        direction TB
        User[Crear Usuario DB]
        IP[Permitir IP 0.0.0.0/0]
        Link[Obtener Connection String]
        
        User --> IP --> Link
    end

    subgraph Render [☁️ Render Dashboard]
        direction TB
        Env[Environment Variables]
        Key[Clave: MONGO_URI]
        Value[Valor: mongodb+srv://...]
        
        Env --> Key --> Value
    end

    Link -->|Copiar| Value
    Value -->|Permite acceso a| Atlas

    style Link fill:#ffcccc,stroke:#333,stroke-width:2px
    style Value fill:#ccffcc,stroke:#333,stroke-width:2px
```

### Pasos Clave para la Conexión:

1.  **En Atlas**:
    *   **Network Access**: Añade la IP `0.0.0.0/0` (Significa: "Permitir acceso desde cualquier lugar", necesario porque Render cambia de IP).
    *   **Database Access**: Crea un usuario con contraseña (¡recuérdala!).
    *   **Connect**: Elige "Drivers" y copia la cadena (`mongodb+srv://<usuario>:<password>@cluster...`).

2.  **En Render**:
    *   Ve a tu servicio web -> **Environment**.
    *   Añade una llave llamada `MONGO_URI`.
    *   Pega la cadena de Atlas. **IMPORTANTE**: Cambia `<password>` por tu contraseña real.

### Comandos de Build y Start en Render

Cuando configures el servicio en Render, te pedirá dos comandos clave:

| Campo | Comando | Explicación |
| :--- | :--- | :--- |
| **Build Command** | `npm install` | Instala las librerías que listaste en `package.json` (express, mongoose, etc.). |
| **Start Command** | `node app.js` | Arranca tu servidor usando el archivo principal que vimos antes. |
