
import { request, response } from "express";

import autenticacionService from "../services/autenticacion.service.js";

/**
 * @module AuthController
 * @description
 * Controlador responsable de manejar las operaciones de autenticación de usuarios.
 * Contiene las funciones para iniciar sesión y registrar nuevos usuarios.
 */

/**
 * Inicia sesión de un usuario existente.
 *
 * @async
 * @function iniciarSesion
 * @param {import("express").Request} req - Objeto de solicitud de Express, que contiene las credenciales del usuario en `req.body`.
 * @param {import("express").Response} res - Objeto de respuesta de Express, usado para devolver la respuesta al cliente.
 *
 * @example
 * Ejemplo de cuerpo esperado (req.body)
 * {
 *   "email": "usuario@ejemplo.com",
 *   "password": "123456"
 * }
 *
 * @returns {Promise<void>} Devuelve una respuesta HTTP:
 * - **200 OK**: Autenticación exitosa. Retorna el token de sesión.
 * - **401 Unauthorized**: Error en las credenciales o fallo en la autenticación.
 */
export const iniciarSesion = async (req = request, res = response) => {
    const {token, error} = await autenticacionService.intentarLogin(req.body);

    if (error) {
        return res.status(401).json({
            mensaje: 'No se logro completar la autenticación',
            error: error
        });
    }

    res.status(200).json({
        mensaje: 'Autenticación exitosa',
        data: {
            token: token
        }
    })
}


/**
 * Registra un nuevo usuario en el sistema.
 *
 * @async
 * @function registro
 * @param {import("express").Request} req - Objeto de solicitud de Express, que contiene los datos del nuevo usuario en `req.body`.
 * @param {import("express").Response} res - Objeto de respuesta de Express.
 *
 * @example
 * Ejemplo de cuerpo esperado (req.body)
 * {
 *   "nombre": "Juan Pérez",
 *   "email": "juan@example.com",
 *   "password": "123456"
 * }
 *
 * @returns {Promise<void>} Devuelve una respuesta HTTP:
 * - **201 Created**: Usuario registrado correctamente.
 * - **400 Bad Request**: Error al registrar el usuario (por ejemplo, correo duplicado o validación fallida).
 */
export const registro = async (req = request, res = response) => {
    const {usuario, error } = await autenticacionService.registrarUsuario(req.body);

    if (error) {
        return res.status(400).json({
            mensaje: 'No se pudo registrar el usuario',
            error :error
        });
    }

    res.status(201).json({
        mensaje: 'Usuario registrado corectamente',
        data: usuario
    });
}