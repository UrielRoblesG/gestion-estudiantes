
import UsuarioModel from '../Models/usuario.model.js';
import RolModel from '../Models/rol.model.js';
/**
 * @module UsuarioRepository
 * @description
 * Repositorio encargado de realizar operaciones de lectura y escritura
 * sobre el archivo `usuarios.json`. Simula el acceso a una base de datos.
 */
class UsuarioRepository {

  async agregarUsuario(usuarioData) {
    const nuevoUsuario = new UsuarioModel(usuarioData);

    return await nuevoUsuario.save();
  }

  async buscarPorEmail(email) {
    return await UsuarioModel.findOne({email: email}).populate('rol');
  }

  async buscarRolPorNombre(rol = '') {
    return await RolModel.findOne({nombre: rol});
  }
}

export default new UsuarioRepository();
