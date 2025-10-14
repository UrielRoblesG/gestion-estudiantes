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
    const {alumno, error} = await alumnoService.guardarAlumno(req.body);

    if (error) {
      return res.status(400).json({mensaje: 'Ocurrio un error al crear el alumno', error: error});
    }

    res.status(201).json({ mensaje: "Alumno creado correctamente", data: alumno });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      mensaje: "Error al crear al alumno",
      error: error.message,
    });
  }
};

/**
 * Controlador para obtener todos los alumnos.
 *
 * @async
 * @function obtenerAlumnos
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de alumnos o un mensaje de error.
 */
export const obtenerAlumnos = async (req = request, res = response) => {
  try {
    // Llama al servicio para guardar el alumno
    const alumnos = await alumnoService.obtenerTodos();

    // Si no hay alumnos registrados
    if (!alumnos || alumnos.length === 0) {
      return res.status(200).json({
        msg: "No se encontraron alumnos registrados",
        data: [],
      });
    }
    // Respuesta exitosa
    res.status(200).json({ msg: "Operacion exitosa", data: alumnos });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      mensaje: "Error al crear al alumno",
      error: error.message,
    });
  }
};

/**
 * Controlador para obtener todos los alumnos.
 *
 * @async
 * @function obtenerAlumnoPorId
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el alumno buscado o un mensaje de error.
 */
export const obtenerAlumnoPorId = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const alumno = await alumnoService.obtenerAlumno(id);

    if (alumno == null) {
      return res
        .status(404)
        .json({ mensaje: `No se encontro el alumno con el ${id} solicitado.` });
    }

    res.status(200).json({ mensaje: "Alumno encontrado", data: alumno });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear al alumno",
      error: error.message,
    });
  }
};

/**
 * Controlador para eliminar un alumno por su ID.
 *
 * @async
 * @function eliminarAlumno
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el alumno eliminado o un mensaje de error.
 */
export const eliminarAlumno = async (req = request, res = response) => {
    const { id }= req.params;

    const alumnoEliminado = await alumnoService.eliminarAlumno(id);

    if (!alumnoEliminado) {
      return res.status(404).json({mensaje: `No se encontro un alumno con el id: ${id}`});
    }

    res.status(200).json({mensaje: 'Alumno eliminado correctamente', data: alumnoEliminado});
};

/**
 * Controlador para eliminar un alumno por su ID.
 *
 * @async
 * @function actualizarAlumno
 * @param {import("express").Request} req - Objeto de solicitud HTTP.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el alumno eliminado o un mensaje de error.
 */
export const actualizarAlumno = async (req = request, res = response) => {
  const {id} = req.params;
  const nuevaData = req.body;

  const {alumno, error} = await alumnoService.actualizarAlumno(id, nuevaData);

  if (error) {
    return res.status(400).json({mensaje: 'Error al actualizar al alumno', error: error});
  }
  res.status(200).json({mensaje: 'Informacion del alumno actualizada con exito', data: alumno});
}