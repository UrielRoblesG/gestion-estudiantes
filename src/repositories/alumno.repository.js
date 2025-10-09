import path from "path";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

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
  guardarAlumno(alumno) {
    return new Promise((resolve, reject) => {
      // Error distinto a "archivo no encontrado"
      fs.readFile(dataPath, (err, data) => {
        if (err && err.code !== "ENOENT") {
          return reject(err);
        }

        // Si existe el archivo, lo parseamos; si no, inicializamos un arreglo vacío
        let alumnos = [];
        if (data) {
          alumnos = JSON.parse(data);
        }

        // Agregamos el nuevo alumno al arreglo
        alumnos.push(alumno);

        // Sobrescribimos el archivo con los nuevos datos
        fs.writeFile(dataPath, JSON.stringify(alumnos, null, 2), (err) => {
          if (err) return reject(err);

          resolve(alumno);
        });
      });
    });
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
      const index = alumnos.findIndex((a) => a.id === id);

      // Retornar alumno encontrado o null si no existe
      const alumno = index >= 0 ? alumnos[index] : null;

      return { alumno, index };
    } catch (error) {
      // Si el archivo no existe, retornamos valores vacíos
      if (error.code === "ENOENT") return { alumno: null, index: -1 };
      throw error;
    }
  }

  
}


export default new AlumnoRepository();
