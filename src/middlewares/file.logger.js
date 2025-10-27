

import { appendFile, mkdir } from "node:fs/promises";
import path from "path";
import { request, response } from "express";

const logFolder = path.resolve("./logs");




/**
 * Middleware de registro de solicitudes HTTP en archivos de log.
 * 
 * Este middleware crea (si no existe) una carpeta `logs` en la raíz del proyecto
 * y escribe en un archivo con nombre basado en la fecha actual (`dia-mes.txt`)
 * los detalles de cada solicitud HTTP procesada por el servidor.
 * 
 * Cada línea de log incluye:
 * - Fecha y hora exacta en formato ISO.
 * - Método HTTP (GET, POST, PUT, DELETE, etc.).
 * - Ruta solicitada.
 * 
 * Ejemplo del contenido de un archivo `logs/8-10.txt`:
 * ```
 * [2025-10-08T16:45:21.103Z] Solicitud: GET - Ruta: /api/alumnos
 * [2025-10-08T16:46:10.882Z] Solicitud: POST - Ruta: /api/alumnos
 * ```
 * 
 * Si ocurre un error al escribir el log, se envía una respuesta HTTP 500.
 * 
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función que transfiere el control al siguiente middleware.
 */
export const fileLogger = async (req = request, res = response, next) => {
  try {

    // console.log(`2. file Log`);

    // Crear carpeta si no existe 
    await mkdir(logFolder, {recursive : true});
    const now = new Date();
    const dia = now.getDate(); // Obtiene el dia
    const mes = now.getMonth() + 1; // Los meses inician en 0
    const fechaHora = now.toISOString();

    const logFile = path.join(logFolder,`${dia}-${mes}.txt`);
    const logLine = `[${fechaHora}] Solicitud: ${req.method} - Ruta: ${req.originalUrl}\n`;

    await appendFile(logFile, logLine);

    next();
  } catch(error) {
      console.error(error.message);
      res.status(500).json({error: error.message});
  }
};