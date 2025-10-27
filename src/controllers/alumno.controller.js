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
  // Llama al servicio para guardar el alumno
  const { alumno, error } = await alumnoService.guardarAlumno(req.body);

  if (error) {
    return res
      .status(400)
      .json({ mensaje: "Ocurrio un error al crear el alumno", error: error });
  }

  res
    .status(201)
    .json({ mensaje: "Alumno creado correctamente", data: alumno });
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
  const { id } = req.params;

  const alumno = await alumnoService.obtenerAlumno(id);

  if (alumno == null) {
    return res
      .status(404)
      .json({ mensaje: `No se encontro el alumno con el ${id} solicitado.` });
  }

  res.status(200).json({ mensaje: "Alumno encontrado", data: alumno });
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
  const { id } = req.params;

  const alumnoEliminado = await alumnoService.eliminarAlumno(id);

  if (!alumnoEliminado) {
    return res
      .status(404)
      .json({ mensaje: `No se encontro un alumno con el id: ${id}` });
  }

  res
    .status(200)
    .json({ mensaje: "Alumno eliminado correctamente", data: alumnoEliminado });
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
  const { id } = req.params;
  const nuevaData = req.body;

  const { alumno, error } = await alumnoService.actualizarAlumno(id, nuevaData);

  if (error) {
    return res
      .status(400)
      .json({ mensaje: "Error al actualizar al alumno", error: error });
  }
  res.status(200).json({
    mensaje: "Informacion del alumno actualizada con exito",
    data: alumno,
  });
};




/**
 * @function actualizarFotoPerfil
 * @description Controlador para actualizar la foto de perfil de un alumno.
 * 
 * Este método recibe un archivo cargado mediante un middleware como `multer`
 * y actualiza la foto de perfil del alumno correspondiente.
 * 
 * @route PUT /api/alumnos/:id/foto
 * @access Público (o restringido según la configuración del proyecto)
 * 
 * @param {express.Request} req - Objeto de solicitud de Express. Debe contener:
 *   - `file`: Información del archivo cargado por `multer`.
 *   - `params.id`: ID del alumno al que se le actualiza la foto (opcional si se manejará luego).
 * @param {express.Response} res - Objeto de respuesta de Express.
 * 
 * @returns {JSON} Respuesta con los datos del archivo subido o mensaje de error.
 * 
 * @example
 * // PUT /api/alumnos/123/foto
 * // Form-data:
 * //  - campo "foto": archivo .jpg
 * 
 * Respuesta:
 * {
 *   "mensaje": "Archivo subido correctamente.",
 *   "archivo": {
 *     "nombreOriginal": "foto_perfil.jpg",
 *     "nombreServidor": "1738947290-foto_perfil.jpg",
 *     "ruta": "uploads/1738947290-foto_perfil.jpg",
 *     "tamaño": "20512 bytes"
 *   }
 * }
 */
export const actualizarFotoPerfil = async (req = request, res = response) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se envió ningún archivo." });
  }


  const {id} = req.headers;
  const { originalname, filename, path: filePath, size } = req.file;


  await alumnoService.actualizarFotoPerfil(filename, id);

  res.status(200).json({
    mensaje: "Archivo subido correctamente.",
    archivo: {
      nombreOriginal: originalname,
      nombreServidor: filename,
      ruta: filePath,
      tamaño: `${size} bytes`,
    },
  });
};
