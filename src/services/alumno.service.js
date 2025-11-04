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
   * @param {Object} alumnoDto - Datos del alumno a guardar.
   * @param {string} alumnoDto.nombre - Nombre del alumno (obligatorio).
   * @param {string} alumnoDto.apellidoPaterno - Apellido paterno del alumno (obligatorio).
   * @param {String} alumnoDto.semestre - Semestre del alumno (obligatorio).
   * @param {String} alumnoDto.email - email del alumno (obligatorio).
   * @param {string} alumnoDto.carrera - Carrera del alumno (opcional).
   * @param {string} [alumnoDto.materiasInscritas] - Materias inscritas del alumno (opcional).
   * @param {string} alumnoDto.perfil - Foto de perfil del alumno (opcional).
   * @returns {Promise<Object>} Promesa que resuelve con el alumno guardado.
   * @throws {Error} Si los datos son inválidos o ocurre un error al guardar.
   */
  async guardarAlumno(alumnoDto) {
    try {
      
      const emailExiste = await alumnoRepository.buscarPorEmail(
        alumnoDto.email.toLowerCase()
      );

      if (emailExiste) {
        return { error: "Ya existe un alumno registrado con ese email." };
      }

      const {
        nombre,
        email,
        carrera,
        apellidoPaterno,
        semestre,
        perfil,
        materiasInscritas
      } = alumnoDto;

      const nuevoAlumnoData = {
        nombre,
        email,
        carrera,
        semestre,
        apellidoPaterno,
        perfil,
        materiasInscritas
      };

      // Guarda en el repositorio
      const alumnoGuardado = await alumnoRepository.guardarAlumno(nuevoAlumnoData);
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

  async obtenerAlumno(id) {
    try {

      // Llamar al repositorio para buscar el alumno
      const alumno  = await alumnoRepository.obtenerPorId(id);

      // Retornar el resultado
      return alumno;
    } catch (error) {
      throw error;
    }
  }

  async eliminarAlumno(id) {
    try {

      return await alumnoRepository.eliminarAlumno(id);

    } catch (error) {}
  }

  async actualizarAlumno(id, data) {
    try {
      const updatedAlumno = await AlumnoRepository.update(id, updateData);
        if (!updatedAlumno) {
            throw new Error(`Alumno con ID ${id} no encontrado para actualizar.`);
        }
        return { alumno: updatedAlumno };
    } catch (error) {
      throw error;
    }
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
