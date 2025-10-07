import path from "path";
import fs from "node:fs";

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
}

// Leer todo el json y cargar los alumnos en []

// insertar el nuevo alumno al final

// guardar el nuevo arreglo en el mismo json.

export default new AlumnoRepository();
