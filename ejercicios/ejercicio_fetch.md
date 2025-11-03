# Instrucciones paso a paso — `obtenerAlumnos`

**Objetivo:** Escribir una función `obtenerAlumnos` que haga una petición `GET` a `/api/alumnos` con un header `Authorization: Bearer <token>`, procese la respuesta y devuelva un arreglo de alumnos. Además que sepa cómo llamarla desde la función principal (usando `await`).

---

## Requisitos previos

1. Conocimientos básicos de JavaScript (variables, funciones, `async`/`await`).
2. Entorno: navegador moderno o proyecto con bundler (Webpack/Vite) que soporte `fetch` y `ES modules` (o usar un `async` IIFE si no hay top-level `await`).
3. Entender promesas y manejo de errores (`try/catch`).

---

## Estructura del ejercicio

Vas a crear la función **exactamente** con la firma:

```js
const obtenerAlumnos = async () => { /* ... */ };
```

Y luego la llamarás desde la función principal (o desde un `async` IIFE) como:

```js
const alumnosData = await obtenerAlumnos();
```

---

## Paso a paso

### Paso 1 — Preparar la URL y el token

1. Crea las variables `url` y `token` al inicio de la función. Para el ejercicio usamos un token fijo (simulado).

```js
const url = '/api/alumnos';
const token = 'eyJpZCI6IjRhZjA0ZTg3LWI4MmMtNGRhMS1hMTMyLWYwMWZmYmFhZGIxZCIsImVtYWlsIjoiYWRtaW5AY29ycmVvLmNvbSIsInJvbCI6IkFkbWluIiwiZW1pdGlkb0VuIjoiMjAyNS0xMS0wM1QxODozNDozMi40OTJaIn0=';
```

> En un proyecto real no hardcodees tokens en el código público. Usa variables de entorno o almacenamiento seguro.

### Paso 2 — Realizar la solicitud `GET` con `fetch` y el header `Authorization`

1. Utiliza `fetch` con `method: 'GET'` y agrega los headers `Content-Type` y `Authorization`.
2. Usa `await` para esperar la respuesta.

```js
const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
```

### Paso 3 — Comprobar `response.ok` y lanzar error si aplica

1. Verifica `if (!response.ok)` para detectar errores HTTP (401, 404, 500, etc.).
2. Lanza un `Error` con información legible.

```js
if (!response.ok) {
  throw new Error(`Error en la solicitud: ${response.statusText} (${response.status})`);
}
```

### Paso 4 — Convertir la respuesta a JSON y devolver los datos

1. Llama a `await response.json()`.
2. Asume que la API devuelve un objeto con la propiedad `data` que contiene el arreglo de alumnos.
3. Devuelve `result.data`.

```js
const result = await response.json();
return result.data;
```

### Paso 5 — Manejo de errores con `try/catch`

1. Envuelve la lógica anterior en un `try/catch`.
2. En caso de error, registra el error en consola y retorna un `[]` para que la UI no colapse.

```js
try {
  // (fetch + comprobaciones + parseo)
} catch (error) {
  console.error("Hubo un error al obtener los alumnos:", error);
  return [];
}
```

---

## Código completo ejemplo

> **IMPORTANTE:** Este bloque es la implementación que deben obtener al final.

```js
const obtenerAlumnos = async () => {
  const url = '/api/alumnos';
  const token = 'eyJpZCI6IjRhZjA0ZTg3LWI4MmMtNGRhMS1hMTMyLWYwMWZmYmFhZGIxZCIsImVtYWlsIjoiYWRtaW5AY29ycmVvLmNvbSIsInJvbCI6IkFkbWluIiwiZW1pdGlkb0VuIjoiMjAyNS0xMS0wM1QxODozNDozMi40OTJaIn0=';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText} (${response.status})`);
    }

    const result = await response.json();
    return result.data;

  } catch (error) {
    console.error("Hubo un error al obtener los alumnos:", error);
    return [];
  }
};
```

---

## Cómo llamar a la función (ejemplos)

### Caso A — Archivo con `top-level await` (module)

```js
// archivo main.mjs o type=module
const alumnosData = await obtenerAlumnos();
console.log(alumnosData);
```

### Caso B — Usando una función `async` o IIFE

```js
async function init() {
  const alumnosData = await obtenerAlumnos();
  // procesar datos: renderizar tabla, etc.
  console.log(alumnosData);
}

init();

// o
(async () => {
  const alumnosData = await obtenerAlumnos();
  console.log(alumnosData);
})();
```

---

## Pruebas y validación

1. **Simular respuesta**: Si no hay backend disponible, usa `fetch` mocking o crea un endpoint local con `json-server` o un archivo estático `alumnos.json` y ajusta `url` para apuntar a él.
2. **Probar errores:** Cambia temporalmente la `url` por una que produzca 404 para comprobar que la función devuelve `[]` y que el error se registra.
3. **Comprobar token inválido:** Cambia el token y verifica que la API devuelve 401 y que tu `catch` lo maneja.

---

## Errores comunes y soluciones

* **`fetch` no está definido**: Estás ejecutando el código en un entorno sin `fetch` (antiguo Node). Solución: usar un polyfill o `node-fetch` en Node.
* **No se puede usar `await` fuera de una función**: Encapsula en un `async` (ver sección "Cómo llamar a la función").
* **Token expira / no autorizado**: Verifica la forma de obtener/renovar tokens y no hardcodearlos.
* **La API devuelve un objeto distinto**: Comprueba la estructura del JSON con `console.log(result)` y ajusta `return result.data` a la propiedad correcta.

---

## Tareas adicionales (extra / para obtener más puntaje)

1. Añadir un timeout a la petición `fetch` (usa `AbortController`).
2. Almacenar temporalmente los alumnos en `sessionStorage` para evitar peticiones repetidas.
3. Añadir una función `obtenerAlumnoPorId(id)` que consuma `/api/alumnos/:id`.
4. Mostrar un spinner en la UI mientras se carga la lista.

---

## Criterios de evaluación

* Implementación correcta de `fetch` con header `Authorization` (30%).
* Manejo correcto de `response.ok` y errores (25%).
* Retornar el arreglo `data` cuando la respuesta es exitosa (25%).
* Buenas prácticas y comentarios en el código (10%).
* Extras (timeout, cache, UI) (10%).

---

Si quieres, añade ahora una pequeña tarea práctica: crear una página HTML que muestre la lista de alumnos en una tabla usando `obtenerAlumnos` y que muestre mensajes cuando la lista está vacía o cuando ocurre un error.
