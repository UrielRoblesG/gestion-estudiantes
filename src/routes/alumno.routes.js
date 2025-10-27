import { Router } from "express";

import {
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  eliminarAlumno,
  actualizarAlumno,
  actualizarFotoPerfil,
} from "../controllers/alumno.controller.js";

import { validarToken } from "../middlewares/validar.token.js";
import { validarRol } from "../middlewares/validar.rol.js";
import { Roles } from "../types/roles.js";

import { crearAlumnoSchema } from "../schemas/crear.alumno.schema.js";
import { handleSchemaErrors } from "../middlewares/handle.schema.errors.js";
import { subirFotoPerfil } from "../middlewares/subir.foto.perfil.js";
/**
 * @fileoverview Rutas para la gestión de alumnos.
 * Estas rutas permiten crear, listar y consultar alumnos individuales.
 *
 * Base URL: `/api/alumnos`
 */
const route = Router();

route.use(validarToken);

/**
 * @route POST /api/alumnos/
 * @description Crea un nuevo alumno en el sistema.
 * @access Público (puede adaptarse a autenticado si se requiere)
 * @example
 * Request body:
 * {
 *   "nombre": "Elena",
 *   "apellidoPaterno": "Vargas",
 *   "apellidoMaterno": "Ramos",
 *   "fechaNacimiento": "2000-03-25",
 *   "email": "elena.vargas@mail.com",
 *   "telefono": "5512340001",
 *   "carreraPrograma": "Diseño Gráfico",
 *   "semestre": 7,
 *   "fechaIngreso": "2020-08-15"
 * }
 */
route.post(
  "/",
  [
    validarRol([Roles.ADMIN, Roles.COORDINADOR]),
    crearAlumnoSchema,
    handleSchemaErrors,
  ],
  crearAlumno
);

/**
 * @route GET /api/alumnos/
 * @description Obtiene la lista completa de alumnos registrados.
 * @returns {Array<Object>} Lista de alumnos.
 */
route.get("/", validarRol([Roles.COORDINADOR]), obtenerAlumnos);

/**
 * @route GET /api/alumnos/:id
 * @description Obtiene la información de un alumno específico por su ID.
 * @param {number} id - Identificador único del alumno.
 * @returns {Object} Objeto con la información del alumno.
 * @example
 * GET /api/alumnos/3
 * {
 *   "id": 3,
 *   "nombre": "María López",
 *   "edad": 22,
 *   "carrera": "Derecho"
 * }
 */
route.get(
  "/:id",
  validarRol([Roles.COORDINADOR, Roles.ALUMNO]),
  obtenerAlumnoPorId
);

/**
 * @route DELETE /api/alumnos/:id
 * @description Elimina un alumno específico por su ID.
 * @param {number} id - Identificador único del alumno.
 * @returns {Object} Objeto con la información del alumno eliminado.
 * @example
 * DELETE /api/alumnos/c97cd766-4246-4879-8208-96208cf0b010
 * {
 *   "id": c97cd766-4246-4879-8208-96208cf0b010,
 *   "nombre": "María López",
 *   "edad": 22,
 *   "carrera": "Derecho"
 * }
 */
route.delete("/:id", validarRol([Roles.COORDINADOR]), eliminarAlumno);

/**
 * @route PUT /api/alumnos/
 * @description Actualiza la informacion de un alumno en el sistema.
 * @access Público (puede adaptarse a autenticado si se requiere)
 * @example
 * Request body:
 * {
 *   "email": "elena.vargas@mail.com",
 *   "telefono": "5512340001",
 *   "carreraPrograma": "Diseño Gráfico",
 *   "semestre": 7,
 *   "fechaIngreso": "2020-08-15"
 * }
 */
route.put(
  "/:id",
  validarRol([Roles.ALUMNO, Roles.COORDINADOR]),
  actualizarAlumno
);



route.post('/subirFotoPerfil', subirFotoPerfil, actualizarFotoPerfil);


export default route;
