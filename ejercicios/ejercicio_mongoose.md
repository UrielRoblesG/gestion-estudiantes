# 🧩 Práctica: Implementación de un Esquema, Modelo y Repositorio con Mongoose

## 🎯 Objetivo
En esta práctica aprenderás a:
1. Definir un **esquema** con Mongoose.  
2. Crear un **modelo** para interactuar con MongoDB.  
3. Desarrollar una **clase de repositorio** con operaciones CRUD.  
4. Implementar un **middleware pre('save')** para generar automáticamente la matrícula de cada alumno.

---

## 🧠 Conceptos clave

- **Schema (Esquema):** Define la estructura y validaciones de los documentos.
- **Model (Modelo):** Representa una colección en la base de datos y permite CRUD básico.
- **Repository (Repositorio):** Se encarga de las operaciones de datos aplicando buenas prácticas de separación de responsabilidades.
- **Middleware (pre/post hooks):** Permiten ejecutar lógica antes o después de ciertas operaciones (como `save`, `update`, `delete`).

---

## 🧰 Material de apoyo

- [Documentación de Mongoose](https://mongoosejs.com/docs/guide.html)
- [Hooks o Middleware en Mongoose](https://mongoosejs.com/docs/middleware.html)
- [Validaciones y restricciones en Mongoose](https://mongoosejs.com/docs/validation.html)

---

## 🪜 PARTE 1 — Implementar el esquema y modelo `Alumno`

### 1️⃣ Crear el archivo del modelo

Crea un archivo dentro de la carpeta `models` con el nombre: `alumno.model.js`


---

### 2️⃣ Importar las dependencias necesarias

Agrega al inicio del archivo:

```javascript
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
```

---

### 3️⃣ Definir el esquema del alumno

Copia el siguiente código:
```javascript
const AlumnoSchema = new Schema({
    matricula: {
        type: String,
        unique: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellidoPaterno: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido'],
    },
    carrera: {
        type: String,
        required: true,
        trim: true,
    },
    semestre: {
        type: Number,
        required: true,
        min: 1,
    },
    fechaIngreso: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'egresado', 'baja temporal'],
        default: 'activo',
    },
    materiasInscritas: {
        type: [String],
        default: [],
    },
    perfil: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false
    },
});
```

---

### 4️⃣ Crear el modelo y exportarlo

```javascript
export default model('Alumno', AlumnoSchema);
```
Esto generará la colección alumnos en tu base de datos.

---

### 💡 Tip:
Usa **trim**, **required**, **enum**, y **match** para mejorar la calidad de los datos desde el inicio.
Esto evitará errores en etapas posteriores del desarrollo.

--- 

## 🪜 PARTE 2 — La clase AlumnoRepository

### 1️⃣ Abre el archivo `alumno.repository.js`

Agrega la importación del modelo al inicio del archivo:
```javascript
import AlumnoModel from "../models/alumno.model.js";
```

--- 

### 3️⃣ Definir la clase del repositorio

Copia el siguiente código completo:

```javascript
import AlumnoModel from "../models/alumno.model.js";

class AlumnoRepository {
  async guardarAlumno(alumnoData) {
    const nuevoAlumno = new AlumnoModel(alumnoData);
    return await nuevoAlumno.save();
  }

  async obtenerTodos() {
    return await AlumnoModel.find({});
  }

  async obtenerPorId(id) {
    return await AlumnoModel.findById(id);
  }

  async eliminarAlumno(id) {
    const softDelete = {
      isDeleted: true,
      deletedAt: new Date(),
    };

    return AlumnoModel.findByIdAndUpdate(id, softDelete, { new: true });
  }

  async buscarPorEmail(email = "") {
    return await AlumnoModel.findOne({ email: email });
  }

  async buscarPorMatricula(matricula) {
    return await AlumnoModel.findOne({ matricula: matricula });
  }

  async actualizarAlumno(id, alumnoActualizado) {
    return await AlumnoModel.findByIdAndUpdate(id, alumnoActualizado, {
      new: true,
      runValidators: true,
    });
  }
}

export default new AlumnoRepository();
```

## 💡 Tip 

Mantener una capa de repositorio te ayudará a aplicar el principio de separación de responsabilidades (SRP).
Esto facilita las pruebas unitarias, el mantenimiento y la escalabilidad del proyecto.


--- 

### 4️⃣ Explicación de los métodos principales
| Método                 | Descripción                                            |
| ---------------------- | ------------------------------------------------------ |
| `guardarAlumno()`      | Crea y guarda un nuevo documento de alumno en MongoDB. |
| `obtenerTodos()`       | Retorna todos los alumnos registrados.                 |
| `obtenerPorId()`       | Busca un alumno por su ID.                             |
| `eliminarAlumno()`     | Realiza un **borrado lógico** (soft delete).           |
| `buscarPorEmail()`     | Encuentra un alumno mediante su correo electrónico.    |
| `buscarPorMatricula()` | Encuentra un alumno usando su matrícula.               |
| `actualizarAlumno()`   | Actualiza la información de un alumno existente.       |

--- 

## 🪜 PARTE 3 — Agregar un middleware pre('save') para generar la matrícula

### 1️⃣ Crear una función auxiliar para generar la matrícula

Agregar al inicio del archivo ``alumno.model.js`` la siguiente importación:
```javascript
import { generarMatricula }from "../utils/generar.matricula.js";
```

---

### Agregar el middleware pre('save')

Después de definir el esquema (AlumnoSchema) y antes de exportar el modelo, agrega el siguiente bloque:
```javascript
AlumnoSchema.pre('save', function (next) {
    this.matricula = generarMatricula(this.fechaIngreso, this.nombre, this.apellidoPaterno);
    next();
});
```
### 🧠 ¿Qué hace este middleware?

1. Antes de guardar (save), Mongoose ejecuta la función anónima.
2. Se genera automáticamente la matrícula con base en:
    - El año de ingreso,
    - La primera letra del nombre,
    - La primera letra del apellido paterno,
    - Y un número aleatorio de 4 dígitos.
3. La matrícula se asigna al campo matricula antes de guardar el documento.

---

## 💡  Tip

Los middlewares en Mongoose son muy poderosos para automatizar tareas repetitivas como validaciones, asignaciones o cálculos antes de guardar los datos.
Úsalos para mantener tu código más limpio y tus modelos más inteligentes.

