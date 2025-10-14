import { generarUUID } from '../utils/generar.uuid.js';

/**
 * @class Usuario
 * @classdesc
 * Representa a un usuario dentro del sistema.
 * Contiene propiedades básicas como correo, nombre, contraseña y rol.
 *
 * @example
 * // Crear un nuevo usuario manualmente
 * const usuario = new Usuario({
 *   email: "usuario@example.com",
 *   password: "123456",
 *   nombre: "Juan Pérez",
 *   rol: "coordinador"
 * });
 *
 * console.log(usuario.id); // UUID generado automáticamente
 */
export class Usuario {
  /**
   * Crea una nueva instancia de Usuario.
   *
   * @constructor
   * @param {Object} param - Objeto con los datos del usuario.
   * @param {string} param0.email - Correo electrónico único del usuario.
   * @param {string} param1.password - Contraseña del usuario (puede estar cifrada).
   * @param {string} param2.nombre - Nombre completo del usuario.
   * @param {string} [param3.rol="coordinador" | "administrador" | "alumno"] - Rol del usuario dentro del sistema.
   */
  constructor({ email, password, nombre, rol = "coordinador" }) {
    /**
     * Identificador único del usuario.
     * @type {string}
     */
    this.id = generarUUID();

    /**
     * Correo electrónico único del usuario.
     * @type {string}
     */
    this.email = email;

    /**
     * Contraseña del usuario (almacenada en texto plano o cifrada).
     * @type {string}
     */
    this.password = password;

    /**
     * Nombre completo del usuario.
     * @type {string}
     */
    this.nombre = nombre;

    /**
     * Rol asignado al usuario (por defecto: "coordinador").
     * @type {string}
     */
    this.rol = rol;
  }

  /**
   * Crea una nueva instancia de Usuario a partir de un objeto plano.
   *
   * @static
   * @function fromObject
   * @param {Object} obj - Objeto con las propiedades del usuario.
   * @param {string} obj.email - Correo electrónico.
   * @param {string} obj.password - Contraseña.
   * @param {string} obj.nombre - Nombre del usuario.
   * @param {string} [obj.rol="coordinador"] - Rol del usuario.
   *
   * @example
   * const usuario = Usuario.fromObject({
   *   email: "prueba@example.com",
   *   password: "abc123",
   *   nombre: "Usuario Prueba"
   * });
   *
   * console.log(usuario instanceof Usuario); // true
   *
   * @returns {Usuario} Instancia del modelo Usuario.
   */
  static fromObject(obj) {
    return new Usuario(obj);
  }
}
