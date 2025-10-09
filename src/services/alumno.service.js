import alumnoRepository from "../repositories/alumno.repository.js";

/**
 * Servicio de alumnos
 *
 * Se encarga de aplicar la lógica de negocio antes de interactuar
 * con el repositorio. Valida los datos y agrega información adicional.
 */
class AlumnoService {
  /**
   * Guarda un nuevo alumno después de validar sus datos.
   *
   * @param {Object} alumnoData - Datos del alumno a guardar.
   * @param {string} alumnoData.nombre - Nombre del alumno (obligatorio).
   * @param {number} alumnoData.edad - Edad del alumno (obligatorio).
   * @param {string} [alumnoData.carrera] - Carrera del alumno (opcional).
   * @returns {Promise<Object>} Promesa que resuelve con el alumno guardado.
   * @throws {Error} Si los datos son inválidos o ocurre un error al guardar.
   */
  async guardarAlumno(alumnoData) {
    return new Promise(async (resolve, reject) => {
      try {
        // Validación de datos obligatorios
        if (!alumnoData.nombre || !alumnoData.edad) {
          return reject(new Error("El alumno debe tener nombre y edad"));
        }
        // Estructura del nuevo alumno
        const nuevoAlumnos = {
          id: Date.now(),
          nombre: alumnoData.nombre,
          edad: alumnoData.edad,
          carrera: alumnoData.carrera,
          fechaRegistro: new Date().toISOString(),
        };
        // Guarda en el repositorio
        const alumnoGuardado = await alumnoRepository.guardarAlumno(
          nuevoAlumnos
        );
        resolve(alumnoGuardado);
      } catch (error) {
        reject(error);
      }
    });
  }

  async obtenerTodos() {
    try {
      const lstAlumnos = await alumnoRepository.obtenerTodos();

      return lstAlumnos;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene un alumno por su ID.
   *
   * @async
   * @param {number|string} id - Identificador del alumno (numérico o cadena convertible a número).
   * @returns {Promise<Object|null>} Promesa que resuelve con el alumno encontrado o `null` si no existe.
   * @throws {Error} Si ocurre un error al obtener el alumno o el ID no es válido.
   */
  async obtenerAlumno(id) {
    try {
      // Convertir el ID a número
      const parsedID = Number.parseInt(id);

      // Llamar al repositorio para buscar el alumno
      const { alumno } = await alumnoRepository.obtenerPorId(parsedID);
      
      // Retornar el resultado
      return alumno;
    } catch (error) {
      throw error;
    }
  }
}

export default new AlumnoService();
