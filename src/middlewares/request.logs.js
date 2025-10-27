

import {request, response} from 'express';

/**
 * Middleware de registro de solicitudes (Request Logger).
 * 
 * Este middleware registra en la consola cada solicitud HTTP que llega al servidor,
 * incluyendo la fecha, el método (GET, POST, PUT, DELETE, etc.) y la URL solicitada.
 * 
 * Es útil para monitorear el tráfico de la API durante el desarrollo
 * o para realizar auditorías simples sin necesidad de herramientas externas.
 * 
 * Ejemplo de salida en consola:
 * ```
 * [Tue, 08 Oct 2025 16:30:00 GMT] Solicitud a GET /api/alumnos
 * ```
 * 
 * @param {import('express').Request} req - Objeto de solicitud HTTP entrante.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función que transfiere el control al siguiente middleware.
 */
export const requestLogs = (req = request, res = response, next) => {
    // console.log('1. ConsoleLogger');
    const log = `[${new Date().toUTCString()}] Solicitud a ${req.method} ${req.originalUrl}`;
    console.log(log);
    next();
}