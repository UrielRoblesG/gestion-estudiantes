import { Router } from "express";

import {
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
} from "../controllers/alumno.controller.js";

/**
 * @fileoverview Rutas para la gestión de alumnos.
 * Estas rutas permiten crear, listar y consultar alumnos individuales.
 * 
 * Base URL: `/api/alumnos`
 */

const route = Router();


/**
 * @route POST /api/alumnos/
 * @description Crea un nuevo alumno en el sistema.
 * @access Público (puede adaptarse a autenticado si se requiere)
 * @example
 * // Request body:
 * {
 *   "nombre": "Juan Pérez",
 *   "edad": 20,
 *   "carrera": "Ingeniería en Sistemas"
 * }
 */
route.post("/", crearAlumno);

/**
 * @route GET /api/alumnos/
 * @description Obtiene la lista completa de alumnos registrados.
 * @returns {Array<Object>} Lista de alumnos.
 */
route.get("/", obtenerAlumnos);


/**
 * @route GET /api/alumnos/:id
 * @description Obtiene la información de un alumno específico por su ID.
 * @param {number} id - Identificador único del alumno.
 * @returns {Object} Objeto con la información del alumno.
 * @example
 * // GET /api/alumnos/3
 * {
 *   "id": 3,
 *   "nombre": "María López",
 *   "edad": 22,
 *   "carrera": "Derecho"
 * }
 */
route.get("/:id", obtenerAlumnoPorId);

export default route;
