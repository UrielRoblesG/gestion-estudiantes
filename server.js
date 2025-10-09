/**
 * @file server.js
 * @description Punto de entrada principal del servidor Express.
 * Configura el middleware global, las rutas base y levanta el servidor.
 */

import express from "express";

import alumnoRoute from './src/routes/alumno.routes.js';

const app = express();

/**
 * Middleware global
 * Permite que el servidor pueda interpretar los cuerpos de las peticiones en formato JSON.
 */
app.use(express.json());

/**
 * Rutas del módulo de alumnos
 * Prefijo: /api/alumnos
 * 
 * Ejemplo:
 *  - POST http://127.0.0.1:3000/api/alumnos/
 *  - GET  http://127.0.0.1:3000/api/alumnos/
 *  - GET  http://127.0.0.1:3000/api/alumnos/:id
 */
app.use("/api/alumnos", alumnoRoute);

// Configuración del servidor - Mas tardes utilizaremos variables de entorno
const host = "127.0.0.1";
const port = 3000;

/**
 * Inicia el servidor en el host y puerto definidos.
 * Muestra en consola la URL de acceso local al iniciar correctamente.
 */
app.listen(port, host, () => {
  console.log(`Servidor a la escucha en http://${host}:${port}/`);
});
