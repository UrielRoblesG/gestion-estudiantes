import express from "express";
import { crearAlumno } from "./src/controllers/alumno.controller.js";

const app = express();

// Middleware global para parsear JSON en las solicitudes
app.use(express.json());

// Ruta principal para registrar alumnos
app.post("/api/alumnos", crearAlumno);

const host = "127.0.0.1";
const port = 3000;

/**
 * Inicia el servidor Express en el puerto configurado.
 */
app.listen(port, host, () => {
  console.log(`Servidor a la escucha en http://${host}:${port}/`);
});
