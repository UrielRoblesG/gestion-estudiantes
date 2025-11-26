/**
 * @file server.js
 * @description Punto de entrada principal del servidor Express.
 * Configura el middleware global, las rutas base y levanta el servidor.
 */

import express from "express";

import alumnoRoute from './src/routes/alumno.routes.js';
import autenticacionRoute from './src/routes/auth.route.js';
import authViewRoutes from "./src/routes/auth.views.routes.js";
import adminViewRoutes from "./src/routes/admin.view.route.js";
import { requestLogs } from "./src/middlewares/request.logs.js";
import { fileLogger } from "./src/middlewares/file.logger.js";
import { handleServerErrors } from "./src/middlewares/handle.server.errors.js";
import configService from "./src/utils/config.service.js";
import database from './src/config/database.js';
import cookieParser from "cookie-parser";

import cors from 'cors';

const app = express();

database.conectar();

// Archivos estaticos
app.use(express.static('public')); 

/**
 * Middleware global
 * Permite que el servidor pueda interpretar los cuerpos de las peticiones en formato JSON.
 */
app.use(express.json());
app.use(requestLogs);
app.use(fileLogger);
app.use(cookieParser());

// Configuracion de CORS
app.use(cors());

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

/**
 * Rutas del módulo de autenticación
 * Prefijo: /api/autenticacion
 * 
 * Ejemplo:
 *   - POST http://127.0.0.1:3000/api/autenticacion/login
 *   - POST http://127.0.0.1:3000/api/autenticacion/registro
 */
app.use('/api/autenticacion', autenticacionRoute);
/**
 * Rutas del módulo de autenticación
 * Prefijo: /api/autenticacion
 * 
 * Ejemplo:
 *   - POST http://127.0.0.1:3000/api/autenticacion/login
 *   - POST http://127.0.0.1:3000/api/autenticacion/registro
 */
 

//* Rutas de las vistas
app.use(authViewRoutes);

app.use('/admin',adminViewRoutes);
// Aqui van los middlewares de manejo de errores
app.use(handleServerErrors);

// Configuración del servidor - Mas tardes utilizaremos variables de entorno
const host = configService.HOST;
const port = configService.PORT;

/**
 * Inicia el servidor en el host y puerto definidos.
 * Muestra en consola la URL de acceso local al iniciar correctamente.
 */
app.listen(port, () => {
  console.log(`Servidor a la escucha en http://${host}:${port}/`);
});
