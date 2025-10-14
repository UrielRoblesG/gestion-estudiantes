

import { appendFile, mkdir } from "node:fs/promises";
import path from "path";
import { request, response } from "express";

const logFolder = path.resolve("./logs");

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