
# Práctica: Obtener un alumno por su ID

En esta práctica agregarás una nueva ruta para obtener la información de un alumno específico usando su id.
Esta ruta complementará el proyecto de gestión de alumnos que ya cuenta con las operaciones:

* ``POST /api/alumnos`` → Crear alumno

* ``GET /api/alumnos`` → Obtener todos los alumnos

Tu objetivo será implementar:

```bash
GET /api/alumnos/:id
```

Esta ruta deberá buscar dentro del archivo ``data/alumno.json`` y devolver solo el alumno cuyo id coincida con el solicitado.
Si el alumno no existe, deberá devolver un mensaje claro de error.

---

# Objetivo del ejercicio

* Implementar la ruta ``GET /api/alumnos/:id``.
* Aplicar el flujo completo Controller → Service → Repository.
* Usar Promesas para operaciones asíncronas.
* Manejar correctamente el parámetro id.

---

## Instrucciones (Plantilla para completar)

* Completa cada bloque de código siguiendo las indicaciones.
* Todos los espacios _________ deben ser reemplazados por el código correcto.

---

## 1. Ruta: ``routes/alumno.routes.js``

Agrega una nueva ruta que reciba un parámetro dinámico ``:id``.

```js
import {Router} from 'express';
import { crearAlumno, obtenerAlumnos, _________ } from '../controllers/alumnoController.js';

const router = Router();

// Rutas existentes
// router.post('/', crearAlumno);
// router.get('/', obtenerAlumnos);

// Completa la ruta para obtener un alumno por su ID
// Ejemplo: /api/alumnos/12345
router.____('/:id', _________);

export default router;

```

---

## 2. Controlador: ``controllers/alumno.controller.js``

Aquí recibirás el parámetro desde la URL (``req.params.id``) y lo enviarás al servicio.
Completa los espacios:

```js
import {request, response} from 'express';
import alumnoService from '../services/alumno.service.js';

// Completa el método para obtener un alumno por ID
export const _________ = async (req = request, res = response) => {
  try {
    const id = req.params.___;
    const alumno = await alumnoService._________(id);

    // Respuesta si no se encontro un alumno
    if (___________) {
      return res.status(404).json({ mensaje: `No se encontro ningún alumno con el id: ${________}` });
    }

    res.status(200).json({mensaje: 'Alumno encontrado exitosamente', data: ________});
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener el alumno',
      error: error.message
    });
  }
};
```

---

## 3. Servicio: ``services/alumno.service.js``

El servicio debe llamar al repositorio y procesar la respuesta.

```js
import alumnoRepository from '../repositories/alumno.repository.js';

class AlumnoService {

  // Completa este método
  async _________(id) {
      try {
        const { ____Desestructurar_alumno____ } = await alumnoRepository._________(id);
        return _________ || null;
      } catch (error) {
        throw error;
      }
  }
}

export default new AlumnoService();
```

---

## 4. Repositorio: ``repositories/alumno.repository.js``

Aquí debes leer el archivo alumno.json, buscar por ID y devolver el alumno encontrado.

```js
import fs from 'fs';

// TODO: Agrega esta importación
import {readFile, writeFile} from 'node:fs/promises';
import path from 'path';

const dataPath = path.resolve('./src/data/alumnos.json');

class AlumnoRepository {
  
  // Completa este método
  async _________(id) {
    try {

      const data = await readFile(___________, 'utf-8');
    
      const alumnos = JSON.parse(________ || '[]');

      // Buscamos al indice del alumno en el arreglo de alumnos
      const index = alumnos.________(____CALLBACK____);
      
      let alumno = null;

      // Si el index > -1 -> Si existe el alumno 
      if (index > -1) 
        alumno = alumnos[_______];

      // Si encontramos al alumno lo regresamos si no regresamos null
      return { alumno, index };
    } catch (error) {
      // Si es error es que el archivo no existe o la ruta esta mal regresamos null 
      if (error.code === 'ENOENT') return {alumno: null, index: -1};
      // Para cualquier otro error, lanza el error para que quien llame a la función
      // lo maneje con un try/catch
      throw error;

    }
  }
}

export default new AlumnoRepository();
```

---

## Pruebas

1. Si no tienes registros en el archivo ``alumnos.json``. Primero realiza un `POST` en:

```bash
POST http://localhost:3000/api/alumnos
```

con un cuerpo JSON como:

```json
{
  "nombre": "Luis Mendoza",
  "edad": 24,
  "carrera": "Ingeniería Mecánica"
}
```

2. Luego haz un GET con el ID generado de un alumno que si exista:

```bash
    GET http://localhost:3000/api/alumnos/reemplaza_por_id
```

3. La respuesta esperada debe ser algo como:

```json
{
  "id": 1728202324123,
  "nombre": "Luis Mendoza",
  "edad": 24,
  "carrera": "Ingeniería Mecánica",
  "fechaRegistro": "2025-10-06T16:14:55.123Z"
}
```

4. Si colocas un ID inexistente, la respuesta debe ser:

```json
{
  "mensaje": "Alumno no encontrado"
}
```
