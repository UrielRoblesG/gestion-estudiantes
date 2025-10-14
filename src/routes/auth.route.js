



import { Router } from "express";

import { iniciarSesion, registro } from "../controllers/auth.controller.js";

const route = Router();

/**
 * @module AuthRoutes
 * @description Define las rutas relacionadas con la autenticación de usuarios,
 * incluyendo el inicio de sesión y el registro.
 */

/**
 * POST /login
 * @summary Inicia sesión con las credenciales del usuario.
 * @description
 * Recibe un objeto JSON con las credenciales del usuario (por ejemplo, correo y contraseña)
 * y delega la lógica de autenticación al controlador `iniciarSesion`.
 *
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @returns {object} 200 - Token de acceso y datos del usuario autenticado.
 * @returns {object} 401 - Credenciales incorrectas o usuario no encontrado.
 */
route.post('/login', iniciarSesion);

/**
 * POST /registro
 * @summary Registra un nuevo usuario en el sistema.
 * @description
 * Recibe los datos del nuevo usuario y delega la creación de cuenta
 * al controlador `registro`.
 *
 * @param {string} req.body.nombre - Nombre completo del usuario.
 * @param {string} req.body.email - Correo electrónico único del usuario.
 * @param {string} req.body.password - Contraseña que se almacenará cifrada.
 * @returns {object} 201 - Usuario creado exitosamente.
 * @returns {object} 400 - Error de validación o correo ya existente.
 */
route.post('/registro', registro);

export default route;