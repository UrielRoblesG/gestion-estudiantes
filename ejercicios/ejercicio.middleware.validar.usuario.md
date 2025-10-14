# Ejercicio: Middleware de ruta `validarRol` en Express.js

## Objetivo

En este ejercicio deberás **crear un middleware de ruta en Express.js** llamado `validarRol` que se encargue de **verificar si el tipo de usuario que hace la petición está autorizado para acceder a una ruta específica**.

---

## Descripción del problema

Imagina que tu aplicación tiene diferentes tipos de usuarios, por ejemplo:

- `"admin"`
- `"coordinador"`
- `"alumno"`

Algunas rutas deben ser accesibles solo para ciertos tipos de usuarios.  
Por ejemplo:

- Solo los `"admin"` pueden acceder a `/api/admin`.
- Solo los `"coordinador"` y `"admin"` pueden acceder a:
  - ``POST api/alumnos``
  - ``DELETE api/alumnos``
  - ``PUT api/alumnos``

Tu tarea es **crear un middleware reutilizable** que pueda recibir como parámetro un **arreglo de tipos de usuario permitidos**, y **valide si el valor enviado en el header `tipo-usuario` coincide con alguno de esos valores**.

---

## Requisitos del middleware

1. Crea un archivo llamado ``validarRol.js`` dentro de una carpeta llamada ``middlewares``.
2. Dentro de este archivo, define un **middleware de orden superior**, es decir, una función que recibe un arreglo de roles permitidos y devuelve el middleware real.
3. Debe recibir como parámetro un **arreglo de strings** que representen los tipos de usuario permitidos.
4. Dentro del middleware, debes obtener el valor del header `tipo-usuario` de la petición (``request``).
5. Si el valor del header **coincide con alguno de los valores permitidos**, debe llamar a `next()`.
6. Si **no coincide o no existe el header**, debe responder con:

   ```js
   res.status(401).json({
       mensaje: "Acceso no autorizado: tipo de usuario inválido o no permitido."
   });

## Desafío adicional (opcional)

Agrega una mejora al middleware para que registre en consola cada intento de acceso con el formato:

```php-template
  Intento de acceso - Usuario: <tipo-usuario> - Ruta: <url> - Fecha: <fecha y hora>
```

## Pruebas

- Agrega el middleware en la ruta ``POST api/alumnos``
  - Ejemplo:

  ```js
    // Crear un alumno
    routes.post("/", validarRoles([Roles.ADMIN, Roles.COORDINADOR]), crearAlumno);

    // Eliminar alumno por id
    routes.delete("/:id", validarRoles([Roles.ADMIN, Roles.COORDINADOR]), eliminarAlumno);
  ```
