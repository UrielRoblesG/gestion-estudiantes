import path from "path";
import { readFile, writeFile } from "node:fs/promises";
import { Usuario } from "../Models/usuario.js";
import { error } from "node:console";

const dataPath = path.resolve("./src/data/usuarios.json");

/**
 * @module UsuarioRepository
 * @description
 * Repositorio encargado de realizar operaciones de lectura y escritura
 * sobre el archivo `usuarios.json`. Simula el acceso a una base de datos.
 */
class UsuarioRepository {

  /**
   * Agrega un nuevo usuario al archivo `usuarios.json`.
   *
   * @async
   * @function agregarUsuario
   * @param {Usuario} usuario - Instancia del usuario a guardar.
   *
   * @example
   * const nuevoUsuario = new Usuario("Juan", "juan@example.com", "123456");
   * const resultado = await usuarioRepository.agregarUsuario(nuevoUsuario);
   *
   * if (resultado.error) {
   *   console.error("Error al guardar usuario:", resultado.error);
   * }
   *
   * @returns {Promise<{error: (Error|null)}>}
   * - **error**: Objeto `Error` si ocurre una falla al escribir el archivo, o `null` si el guardado fue exitoso.
   */
  async agregarUsuario(usuario = new Usuario()) {
    try {
      const data = await readFile(dataPath, 'utf-8');

      const usuarios = JSON.parse(data || '[]');

      usuarios.push(usuario);

      await writeFile(dataPath, JSON.stringify(usuarios, null, 2));
      
      return {error : null}
    } catch (error) {
      return {error};
    }
  }

  /**
   * Busca un usuario por su correo electrónico en el archivo `usuarios.json`.
   *
   * @async
   * @function buscarPorEmail
   * @param {string} email - Correo electrónico del usuario a buscar.
   *
   * @example
   * const usuario = await usuarioRepository.buscarPorEmail("juan@example.com");
   * if (usuario) {
   *   console.log("Usuario encontrado:", usuario);
   * } else {
   *   console.log("No se encontró el usuario.");
   * }
   *
   * @returns {Promise<Usuario|undefined>}
   * - **Usuario**: Objeto del usuario encontrado.
   * - **undefined**: Si no existe el archivo o no se encontró ningún usuario con ese correo.
   */
  async buscarPorEmail(email) {
    try {
      // Leer archivo y parsear los datos
      const data = await readFile(dataPath, "utf-8");
      const usuarios = JSON.parse(data || "[]");

      // Buscar usuario
      const usuario = usuarios.find(u => u.email === email);
      
      return usuario;
    } catch (error) {
      // Si el archivo no existe, retornamos undefined
      if (error.code === "ENOENT") return undefined;
      throw error;
    }
  }
}

export default new UsuarioRepository();
