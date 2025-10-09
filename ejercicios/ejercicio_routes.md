# Práctica: Creación del Router de Alumnos

## Descripción de la actividad

En esta práctica aprenderás a crear y configurar un Router de Express para manejar las rutas relacionadas con los alumnos.
El objetivo es centralizar las rutas del módulo de alumnos en un archivo dedicado llamado ``alumno.routes.js`` (o ``alumno.router.js``), y conectarlo con el controlador correspondiente.

El router permitirá organizar de manera clara los endpoints como:

POST /api/alumnos → Crear un alumno

GET /api/alumnos → Obtener todos los alumnos

## Objetivo del ejercicio

Implementar un ``Router`` que defina las rutas de los alumnos y las exporte correctamente para que puedan ser usadas desde ``server.js``.

## Estructura del proyecto sugerida

```kotlin
gestion-alumnos/
├─ src/
|   ├─ routes/
|   │   └─ alumno.routes.js  ← 🧠 Aquí trabajarás
|   ├─ controllers/
|   │   └─ alumno.controller.js
|   ├─ services/
|   │   └─ alumno.service.js
|   ├─ repositories/
|   │   └─ alumno.repository.js
|   ├─ data/
|   └─   └─ alumnos.json
└─ server.js
```

## Instrucciones (Plantilla para completar)

Completa el siguiente archivo para crear tu router.
Recuerda usar Express Router y exportar el módulo correctamente.

```js
// 1️ Importa express
import {________} from 'express';

// 2️ Importa los métodos del controlador
import { ________, ________ } from '../controllers/alumnoController.js';

// 3️ Crea una instancia del router
const router = ________();

// 4️ Define la ruta para crear un alumno (POST)
// URL: /api/alumnos
router.____('/', ________);

// 5️ Define la ruta para obtener alumnos (GET)
// URL: /api/alumnos
router.____('/', ________);

// 6️ Exporta el router para usarlo en app.js
export default ________;
```

## Integración en server.js

Asegúrate de importar y registrar tu router en el archivo principal de la aplicación (``server.js``).

Ejemplo de estructura (ellos pueden copiar y pegar esto, o tú lo puedes dejar como referencia):

```js
import express from 'express';
import ________ from './routes/alumno.routes.js';

const app = express();
app.use(express.json());

// Registrar las rutas del módulo de alumnos
app.use('/api/alumnos', ________);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```

## Pruebas

Una vez que el router esté configurado correctamente:

1. Realiza un POST a:

```bash
http://localhost:3000/api/alumnos
```

2. con un cuerpo JSON como:

```json
{
  "nombre": "Sofía Martínez",
  "edad": 20,
  "carrera": "Ingeniería Industrial"
}
```