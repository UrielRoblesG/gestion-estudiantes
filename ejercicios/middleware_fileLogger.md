
# Ejercicio: Middleware global `fileLogger` en Express.js

## Objetivo

Crear un **middleware global en Express.js** llamado `fileLogger` que registre información de cada solicitud HTTP en un archivo de logs. El middleware debe ser **reutilizable y seguro**, y escribir la información en archivos separados por día y mes.

---

## Descripción del problema

En aplicaciones web, es importante llevar un **registro de las solicitudes** que llegan al servidor para fines de depuración y monitoreo.  
Tu tarea es **crear un middleware global** que:

1. Se ejecute **para todas las rutas**.
2. Cree un archivo de log en la carpeta `./logs/` con el nombre `<día>-<mes>.txt`.
3. Escriba en cada log la siguiente información:
   - Tipo de solicitud (`GET`, `POST`, etc.).
   - Ruta completa de la solicitud.
   - Fecha y hora de la solicitud.
4. Si la carpeta `logs` no existe, debe crearla automáticamente.
5. Cada nueva solicitud debe **agregarse al final del archivo**, sin sobrescribir el contenido existente.

---

## Requisitos del middleware

- Nombre del middleware: `fileLogger`
- Debe ser **global** (aplicarse a todas las rutas).
- Formato de registro sugerido:
  - [YYYY-MM-DD HH:mm:ss] Solicitud: <TIPO> - Ruta: <RUTA>

  ```js
    `[${new Date().toUTCString()}] Solicitud: ${req.originalUrl}\n`
  ```

## Estructura del proyecto

```kotlin
gestion-estudiantes/
└─ src/
  └─ middlewares/
    └─ fileLogger.js
```

## Plantilla de `fileLogger.js`

```js
import { appendFile, mkdir } from "node:fs/promises";
import path from "path";
import { request, response } from "express";

const logFolder = path.resolve("./logs");

export const fileLogger = async (req = request, res = response, next) => {
  try {
    // Crear carpeta si no existe 
    await mkdir(logFolder, {recursive : true});
    const ______ = new Date();
    const ______ = now.getDate(); // Obtiene el dia
    const ______ = now.getMonth() + 1; // Los meses inician en 0
    const fechaHora = now.toISOString();

    const logFile = path.join(logFolder, `${________}-${________}.txt`);
    const _________ = `[${________}] Solicitud: ${req.________} - Ruta: ${______.originalUrl}\n`;

    await appendFile(logFile, ____textoAEscribir____);

    next();
  } catch(error) {
      console.error(error.message);
      res.status(500).json({error: error.message});
  }
};
```

## Agrega el middleware de forma global

```js
    import { ___nombreDeLaFuncion___ } from "./middlewares/fileLogger.js";

    app.use(_______nombreDeLaFuncion_______);
```

## Prueba tu middleware

1. Ejecuta tu servidor

```bash
npm run dev
```

2. Realiza solicitudes `GET` y `POST` a `api/alumnos` usando **Postman**
3. Verifica que se cree un archivo en ``./logs/`` con el nombre `<dia>-<mes>.txt` y que contenga las solicitudes registradas.

