import alumnoRepository from "../repositories/alumno.repository.js";
import { Estudiante } from "../Models/Estudiante.js";
import { calcularEdad } from "../utils/calcular.edad.js";
import { EMAIL_REGEX } from "../utils/email.exp.js";

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
    try {
      // Realizar validaciones
      const errores = await this._validarAlumno(alumnoData);

      if (errores.length > 0) {
        return { alumno: undefined, error: errores };
      }

      const nuevoAlumno = Estudiante.fromObject(alumnoData);

      // Guarda en el repositorio
      const alumnoGuardado = await alumnoRepository.guardarAlumno(nuevoAlumno);
      return { alumno: alumnoGuardado, error: undefined };
    } catch (error) {
      throw error;
    }
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

  async eliminarAlumno(id) {
    try {
      const parsedId = Number.parseInt(id, 10);

      const { alumno, index } = await alumnoRepository.obtenerPorId(parsedId);

      if (index === -1) return undefined;

      await alumnoRepository.eliminarAlumno(index);

      return alumno;
    } catch (error) {}
  }

  /**
   * Actualiza los datos de un alumno existente.
   * @param {string} id - El ID del alumno a actualizar.
   * @param {object} alumnoData - Los datos a actualizar.
   * @returns {Promise<Alumno>} El alumno actualizado.
   * @throws {Error} Si el alumno no existe o las validaciones fallan.
   */
  async actualizarAlumno(id, data) {
    try {
      const { alumno: alumnoActual, index } =
        await alumnoRepository.obtenerPorId(id);

      if (!alumnoActual) {
        return {
          alumno: undefined,
          error: `[Validacion] No se encontró ningún alumno con el ID: ${id}.`,
        };
      }

      const datosCompletos = {
        ...alumnoActual,
        ...data,
      };

      const erroresValidacion = await this._validarAlumno(
        datosCompletos,
        false
      );

      if (erroresValidacion.length > 0) {
        return { alumno: undefined, error: erroresValidacion };
      }

      // Validar unicidad de EMAIL (Si el email es nuevo y ya existe en otro alumno)
      const emailExistente = await alumnoRepository.buscarPorEmail(
        datosCompletos.email
      );
      if (emailExistente && emailExistente.id !== id) {
        return {
          error: `[Validacion] El email ${datosCompletos.email} ya pertenece a otro alumno.`,
        };
      }

      const alumnoNuevaData = Estudiante.fromObject(datosCompletos);
      // 4. Guardar en el Repositorio
      await alumnoRepository.actualizarAlumno(index, alumnoNuevaData);

      // 5. Devolver el alumno actualizado
      return { alumno: alumnoNuevaData };
    } catch (error) {
      throw error;
    }
  }

  // MetodosPrivados
  async _validarAlumno(alumnoData, validarEmail = true) {
    let errores = [];
    // a) Campos obligatorios
    const camposObligatorios = [
      "nombre",
      "apellidoPaterno",
      "email",
      "carreraPrograma",
      "semestre",
      "fechaNacimiento",
      "apellidoMaterno",
      "fechaIngreso",
    ];
    for (const campo of camposObligatorios) {
      if (!alumnoData[campo]) {
        const err = `[Validacion] El campo '${campo}' es obligatorio.`;

        errores.push(err);
      }
    }

    // b) Validar formato de email
    if (!EMAIL_REGEX.test(alumnoData.email)) {
      errores.push("[Validacion] El formato del email es inválido.");
    }

    // c) Verificar edad mayor a 15
    const fechaNacimiento = new Date(alumnoData.fechaNacimiento);
    if (isNaN(fechaNacimiento)) {
      errores.push("[Validacion] La fechaNacimiento es inválida.");
    }

    const edad = calcularEdad(fechaNacimiento);
    if (edad <= 15) {
      errores.push(
        `[Validacion] La edad mínima requerida es 16 años. Edad calculada: ${edad}.`
      );
    }

    // d) Validar que no exista otro alumno con el mismo email (Asume búsqueda síncrona/rápida)
    if (!validarEmail) return errores;

    if (await alumnoRepository.buscarPorEmail(alumnoData.email)) {
      errores.push(
        `[Validacion] Ya existe un alumno registrado con el email: ${alumnoData.email}.`
      );
    }
    return errores;
  }

  /**
   * @function actualizarFotoPerfil
   * @description Actualiza la foto de perfil de un alumno.
   * Mueve el archivo cargado desde la carpeta temporal `uploads/`
   * a una ruta permanente con el nombre del alumno (ID) y actualiza su registro.
   *
   * @param {string} nombreArchivo - Nombre temporal del archivo subido (ej. "imagen-Date.now.jpg").
   * @param {string} id - ID del alumno al que se actualizará en nombre de la foto de perfil.
   *
   * @returns {Promise<void>} No retorna nada, pero actualiza la información del alumno en el repositorio.
   *
   * @throws {Error} Si el alumno no existe, o si ocurre un error al mover el archivo.
   *
   * @example
   * await alumnoService.actualizarFotoPerfil("imagen-1760578921091.jpg", "c8b75d8e-b471-4560-9a94-80e0372e68b9");
   */
  async actualizarFotoPerfil(nombreArchivo, id = "") {
    try {
      const { alumno, index } = await alumnoRepository.obtenerPorId(id);

      // validar si no se obtiene nada pues regresar un error

      const oldPath = path.resolve(`uploads/${nombre}`);

      const newPath = path.resolve(`uploads/${id}${extname(nombre)}`);

      await fs.rename(oldPath, newPath);

      alumno.perfil = newPath;

      await alumnoRepository.actualizarAlumno(index, alumno);
    } catch (error) {
      throw error;
    }
  }
}

export default new AlumnoService();
