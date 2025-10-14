
# Práctica: Eliminar un alumno por su ID

## Descripción de la actividad

En esta práctica agregarás una nueva ruta para eliminar un alumno específico usando su ``id``.
Esta ruta complementará el proyecto de gestión de alumnos que ya cuenta con las operaciones:

* ``POST /api/alumnos`` → Crear alumno

* ``GET /api/alumnos`` → Obtener todos los alumnos

* ``GET /api/alumnos/:id`` → Obtener un alumno por ID

Tu objetivo será implementar:

```bash
DELETE /api/alumnos/:id
```

Esta ruta deberá buscar dentro del archivo data/alumno.json y eliminar el alumno cuyo id coincida con el solicitado.
Si el alumno no existe, deberá devolver un mensaje claro de error.

---

## Objetivo del ejercicio

* Implementar la ruta **``DELETE /api/alumnos/:id``**.
* Aplicar el flujo completo ``Controller → Service → Repository``.
* Usar Promesas para operaciones asíncronas.
* Manejar correctamente el parámetro ``id`` y el caso de alumno inexistente.

---

## Instrucciones (Plantilla para completar)

Completa cada bloque de código reemplazando los espacios _________.

1. **Ruta: `rutes/alumno.routes.js`**

```js
import {Router} from 'express';
import { crearAlumno, obtenerAlumnos, obtenerAlumnoPorId, _________ } from '../controllers/alumno.controller.js';

const router = Router();

// Rutas existentes
// router.post('/', crearAlumno);
// router.get('/', obtenerAlumnos);
// router.get('/:id', obtenerAlumnoPorId);

// Completa la ruta para eliminar un alumno por su ID
router.____('/:id', _________);

export default router;
```

2. **Controlador: `controllers/alumno.controller.js`**

```js
import alumnoService from '../services/alumno.service.js';

// Completa el método para eliminar un alumno
export const _________ = async (req = request, res = reponse) => {
  try {
    const id = req.params.___;
    const alumnoEliminado = await alumnoService._________(id);

    // ¿Si no se encontro un alumno con el id que le regresamos al usuario?
    if (__________) {
      return ____.status(____CodigoError____).json({ mensaje: '______Mensaje______' });
    }

    res.status(200).json({ mensaje: 'Alumno eliminado correctamente', data: _________ });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el alumno',
      error: error.message
    });
  }
};
```

3. **Servicio: `services/alumno.service.js`**

```js
import alumnoRepository from '../repositories/alumno.repository.js';

class AlumnoService {
  // Otros métodos...

  // Completa este método
   async _________(id = 0) {
    try {
      // Primero obtenemos el alumno y su index
      const { __________, _________ } = await alumnoRepository._________(id);
      
      // ¿Si el alumno no se encontro que debemos regresar?
      if (_____ === -1) return _____;
      
      // Llamamos al método del repository para eliminar usando el index
      await ________________.______________(_________);

      // Si la eliminacion es exitosa regresamos el alumno
      return __________;
    } catch (error) {
      throw error;
    }
  }
}

export default new AlumnoService();
```

4. **Repositorio: `repositories/alumnoRepository.js`**

```js
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('./src/data/alumnos.json');

class AlumnoRepository {
  // Otros métodos...

  // Completa este método
  async _________(index) {
    try {
      const data = ______ readfile(_______, 'utf-8');

      const alumnos = JSON.________(data || '[]');

      // Método de los arreglos que nos sirve para eliminar ciertos elementos en arreglo
      // Pista: alumnos.sp____
      alumnos.________(_____, 1);

      await writeFile(________, JSON.stringfy(________, null, 2));
      
      // 🤔 ¿Necesitamos regresar algo?
    } catch (_________) {
      throw ______;
    }
  }
}

export default new AlumnoRepository();
```

---

## 🧪 Pruebas

1. Primero, en caso de no tener registros en el archivo ``alumnos.json``, crear un alumno con **``POST``**:

```json
{
  "nombre": "Mario López",
  "edad": 25,
  "carrera": "Arquitectura"
}
```

2. Luego eliminar el alumno creado con **``DELETE``**:

```bash
DELETE http://localhost:3000/api/alumnos/idDelAlumno
```

3. Respuesta esperada si se eliminó correctamente:

```json
{
  "mensaje": "Alumno eliminado correctamente",
  "data": {
    "id": 1728202324123,
    "nombre": "Mario López",
    "edad": 25,
    "carrera": "Arquitectura",
    "fechaRegistro": "2025-10-06T16:14:55.123Z"
  }
}
```

4. Respuesta si el ID no existe:

````json
{
  "mensaje": "Alumno no encontrado"
}
````