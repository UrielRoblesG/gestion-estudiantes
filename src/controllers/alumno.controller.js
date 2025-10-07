import { request, response } from "express";

import alumnoService from "../services/alumno.service.js";

/**
 * Controlador para crear un nuevo alumno.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Retorna una respuesta JSON con el resultado.
 */
export const crearAlumno = async (req = request, res = response) => {
  try {
    // Llama al servicio para guardar el alumno
    const alumno = await alumnoService.guardarAlumno(req.body);

    res.status(201).json({ msg: "Alumno creado correctamente", data: alumno });
    
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      mensaje: "Error al crear al alumno",
      error: error.message,
    });
  }
};
