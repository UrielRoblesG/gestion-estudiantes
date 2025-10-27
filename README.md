
# 📚 Gestión de Estudiantes

Proyecto en **Node.js** que implementa una pequeña API REST para la gestión de estudiantes.  
El sistema sigue una arquitectura basada en capas (**Controller → Service → Repository**) y utiliza **Express.js** para manejar las rutas y peticiones HTTP.

---
## 📖 Repositorio
  ```bash 
  git clone https://github.com/UrielRoblesG/gestion-estudiantes.git
  ```

---

## 🚀 Características principales

- Registro de nuevos estudiantes mediante una API REST.  
- Persistencia de datos en un archivo `JSON`.  
- Estructura modular con separación clara de responsabilidades.  
- Uso de **Nodemon** para desarrollo con recarga automática.  
- TODO: Aun en construcción.

---

## 🧩 Estructura del proyecto

``` kotlin

gestion-estudiantes/
│
├── package.json
├── server.js
└── src/
    ├── controllers/
    │   └── alumno.controller.js
    ├── services/
    │   └── alumno.service.js
    ├── repositories/
    │   └── alumno.repository.js
    └── data/
        └── alumnos.json
```

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (normalmente incluido con Node)
- [git](https://git-scm.com/)

---

## 📦 Instalación

1. **Clona este repositorio:**

```bash

   git clone https://github.com/UrielRoblesG/gestion-estudiantes.git
   
```

2.**Entra al directorio del proyecto:**

   ```bash
   cd gestion-estudiantes
   ```

3.**Instala las dependencias:**

```bash
   npm install
   ```

---

## 🧑‍💻 Ejecución del proyecto

### Modo desarrollo

Ejecuta el proyecto con **Nodemon** (se recarga automáticamente al detectar cambios):

```bash
npm run dev
```

El servidor se levantará en:

``` bash

http://127.0.0.1:3000/

```

### Modo producción

Para ejecutar sin recarga automática:
```bash
npm run prod
```

---

## 📡 Endpoints disponibles

### ➤ Crear un nuevo alumno

**URL:**  
`POST /api/alumnos`

**Body (JSON):**

```json
{
  "nombre": "Juan Pérez",
  "edad": 21,
  "carrera": "Ingeniería en Sistemas"
}
```

**Respuesta exitosa (200):**

```json
{
  "msg": "Operación exitosa",
  "data": {
    "id": 1728323920000,
    "nombre": "Juan Pérez",
    "edad": 21,
    "carrera": "Ingeniería en Sistemas",
    "fechaRegistro": "2025-10-07T17:10:00.000Z"
  }
}
```

---

## 🧪 Prueba con Postman o cURL

Puedes probar la API con herramientas como **Postman**.

### Ejemplo con Postman

1. Crea una nueva petición `POST` a `http://127.0.0.1:3000/api/alumnos`
2. Selecciona la pestaña **Body → raw → JSON**
3. Agrega el siguiente contenido:

   ```json
   {
     "nombre": "Laura López",
     "edad": 22,
     "carrera": "Diseño"
   }
   ```

4. Presiona **Send** para enviar la solicitud.

---

## 🗂️ Archivos importantes

| Archivo | Descripción |
|----------|-------------|
| `server.js` | Punto de entrada del servidor Express. |
| `alumno.controller.js` | Recibe las solicitudes HTTP y envía las respuestas. |
| `alumno.service.js` | Contiene la lógica de negocio y validación de datos. |
| `alumno.repository.js` | Gestiona la persistencia de los alumnos en el archivo JSON. |
| `alumnos.json` | Base de datos simulada donde se guardan los registros. |

---

## 🧠 Notas de desarrollo

- El archivo `alumnos.json` se crea automáticamente si no existe.  
- Nodemon está configurado para **ignorar la carpeta `/data`**, evitando recargas innecesarias.  
- La fecha de registro del alumno se genera automáticamente con el formato ISO.  

---

## 📜 Licencia

Este proyecto está licenciado bajo la licencia **ISC**.  
Puedes modificarlo y reutilizarlo libremente con fines educativos o personales.

---

## ✉️ Autor

Desarrollado por **Uriel Robles Gil**  
Profesor / Desarrollador Full Stack  
