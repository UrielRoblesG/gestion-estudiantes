import path from "path";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { Estudiante } from "../Models/Estudiante.js";

const dataPath = path.resolve("./src/data/alumnos.json");

/**
 * Repositorio de alumnos
 *
 * Se encarga de manejar la persistencia de los datos en el archivo JSON.
 */
class AlumnoRepository {
  /**
   * Guarda un alumno en el archivo alumnos.json.
   *
   * @param {Object} alumno - Objeto con los datos del alumno.
   * @returns {Promise<Object>} Promesa que resuelve con el alumno guardado.
   */
  async guardarAlumno(alumno) {
    try {
      const data = await readFile(dataPath, 'utf-8');
      const alumnos = JSON.parse(data || '[]');
      // Agregamos el nuevo alumno al arreglo
      alumnos.push(alumno);

      await writeFile(dataPath, JSON.stringify(alumnos,null, 2));

      return alumno;
    } catch(error) {
      throw error;
    } 
  }

  /**
   * Obtiene todos los alumnos almacenados en el archivo JSON.
   *
   * @async
   * @returns {Promise<Array<Object>>} Promesa que resuelve con un arreglo de alumnos.
   * Si el archivo no existe, devuelve un arreglo vacío.
   * @throws {Error} Si ocurre un error distinto a "archivo no encontrado" (ENOENT).
   */
  async obtenerTodos() {
    try {
      // Leer el archivo y parsear los datos
      const data = await readFile(dataPath, "utf-8");
      const alumnos = JSON.parse(data || "[]");
      return alumnos;
    } catch (error) {
      // Si el archivo no existe, retornar arreglo vacío
      if (error.code === "ENOENT") return [];
      // Cualquier otro error se propaga
      throw error;
    }
  }

  /**
   * Busca un alumno por su ID en el archivo de datos.
   *
   * @async
   * @param {number} id - Identificador único del alumno.
   * @returns {Promise<{ alumno: Object|null, index: number }>}
   * Retorna un objeto con el alumno encontrado y su índice.
   * Si no existe, `alumno` será `null` y `index` será `-1`.
   * @throws {Error} Si ocurre un error distinto a "archivo no encontrado" (ENOENT).
   */
  async obtenerPorId(id) {
    try {
      // Leer archivo y parsear los datos
      const data = await readFile(dataPath, "utf-8");
      const alumnos = JSON.parse(data || "[]");

      // Buscar alumno por ID
      const index = alumnos.findIndex((a) => a.id == id);

      // Retornar alumno encontrado o null si no existe
      const alumno = index >= 0 ? alumnos[index] : null;

      return { alumno, index };
    } catch (error) {
      // Si el archivo no existe, retornamos valores vacíos
      if (error.code === "ENOENT") return { alumno: null, index: -1 };
      throw error;
    }
  }

  async eliminarAlumno(index) {
    try {
      const data = await readFile(dataPath, "utf-8");

      const alumnos = JSON.parse(data || "[]");

      alumnos.splice(index, 1);

      await writeFile(dataPath, JSON.stringify(alumnos, null, 2));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca un alumno por email.
   * @param {string} email - El email a buscar.
   * @returns {Alumno | undefined} El alumno encontrado o undefined.
   */
  async buscarPorEmail(email = '') {
    try {
      // Leer archivo y parsear los datos
      const data = await readFile(dataPath, "utf-8");
      const alumnos = JSON.parse(data || "[]");

      const alumno = alumnos.find(e => e.email === email.toLowerCase());

      return alumno;
    } catch (error) {
      throw error;
    }
  }

 /**
   * Actualiza un alumno.
   * @param {string} id - El id del alumno a actualizar.
   * @param {Estudiante} alumnoActualizado - El nuevo objeto Estudiante con la info actualizada.
   * @returns {undefined} undefined.
   */
  async actualizarAlumno(index = 0, alumnoActualizado = new Estudiante()) {
    try {
      const data = await readFile(dataPath, 'utf-8');

      const alumnos = JSON.parse(data, '[]');

      alumnos[index] = alumnoActualizado;

      await writeFile(dataPath, JSON.stringify(alumnos, null, 2));
    } catch (error) {
      throw error;
    }
  }
}

export default new AlumnoRepository();
