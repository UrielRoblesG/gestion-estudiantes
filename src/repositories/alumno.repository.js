import AlumnoModel from "../Models/alumno.model.js";

class AlumnoRepository {
  async guardarAlumno(alumnoData) {
    const nuevoAlumno = new AlumnoModel(alumnoData);
    return await nuevoAlumno.save();
  }

  async obtenerTodos() {
    return await AlumnoModel.find({});
  }


  async obtenerPorId(id) {
    return await AlumnoModel.findById(id);
  }

  async eliminarAlumno(id) {
    const softDelete = {
      isDeleted: true,
      deletedAt: new Date(),
    };

    return AlumnoModel.findByIdAndUpdate(id, softDelete, { new: true });
  }


  async buscarPorEmail(email = "") {
    return await AlumnoModel.findOne({email: email});
  }


  async buscarPorMatricula(matricula) {
    return await AlumnoModel.findOne({matricula: matricula});
  }

  async actualizarAlumno(id, alumnoActualizado) {
    return await AlumnoModel.findByIdAndUpdate(id, alumnoActualizado, {
      new: true,
      runValidators: true,
    });
  }
}

export default new AlumnoRepository();
