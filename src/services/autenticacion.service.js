
import usuarioRepository from "../repositories/usuario.repository.js";
import {Roles} from '../types/roles.js';

/**
 * @module AutenticacionService
 * @description
 * Servicio responsable de manejar la lógica de negocio relacionada con la autenticación
 * y el registro de usuarios. Incluye validaciones, verificación de credenciales
 * y simulaciones de generación de tokens.
 */
class AutenticacionService {
  /**
   * Intenta autenticar a un usuario con sus credenciales.
   *
   * @async
   * @function intentarLogin
   * @param {Object} credenciales - Credenciales del usuario.
   * @param {string} credenciales.email - Correo electrónico del usuario.
   * @param {string} credenciales.password - Contraseña del usuario.
   *
   * @example
   * const resultado = await autenticacionService.intentarLogin({
   *   email: "usuario@example.com",
   *   password: "123456"
   * });
   *
   * if (resultado.token) {
   *   console.log("Login exitoso:", resultado.token);
   * }
   *
   * @returns {Promise<{token?: string, view?: string ,error?: string}>}
   * - **token**: Token de autenticación simulado si las credenciales son correctas.
   * - **error**: Mensaje de error si el inicio de sesión falla.
   */
  async intentarLogin(credenciales) {
    try {
      // Extraer email y contraseña
      const { email, password } = credenciales;

      if (!email || !password) {
        return { error: "Correo y contraseña son requeridos" };
      }

      const usuario = await usuarioRepository.buscarPorEmail(email.toLowerCase());

      if (!usuario) {
        return {
          error: `No se encontro una cuenta asociada al email proporcionado ${email}`,
        };
      }

      // Simular comparación de contraseñas "encriptadas"
      // En la práctica se usaría bcrypt.compare(pass, usuario.password)
      const contrasenaValida = await usuario.compararPassword(password);

      if (!contrasenaValida) {
        return { error: "Contraseña incorrecta" };
      }

      // Simular generación de JWT
      // En la práctica se usaría jsonwebtoken.sign(payload, secret, options)
      const tokenSimulado = this._simularGeneracionToken(usuario);

      // Obtener vista
      const vista = this._obtenerRutaHome(usuario.rol.nombre);

      return { 
        token: tokenSimulado, 
        view: vista
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario en el sistema, validando los datos proporcionados.
   *
   * @async
   * @function registrarUsuario
   * @param {Object} nuevoUsuarioDto - Datos del usuario a registrar.
   * @param {string} nuevoUsuarioDto.nombre - Nombre completo del usuario.
   * @param {string} nuevoUsuarioDto.email - Correo electrónico del usuario.
   * @param {string} nuevoUsuarioDto.password - Contraseña del usuario.
   * @param {string} nuevoUsuarioDto.rol - Rol del usuario.
   *
   * @example
   * const resultado = await autenticacionService.registrarUsuario({
   *   nombre: "Juan Pérez",
   *   email: "juan@example.com",
   *   password: "123456",
   *   rol: "Admin",
   * });
   *
   * if (resultado.usuario) {
   *   console.log("Usuario registrado:", resultado.usuario);
   * }
   *
   * @returns {Promise<{usuario?: Usuario, error?: string|string[]}>}
   * - **usuario**: Objeto del nuevo usuario si se registró correctamente.
   * - **error**: Mensaje o lista de errores si hubo problemas de validación o registro.
   */
  async registrarUsuario(nuevoUsuarioDto) {
    try {

      const {email, password, nombre, rol } = nuevoUsuarioDto;

      const usuarioExiste = await usuarioRepository.buscarPorEmail(email.toLowerCase());

      if (usuarioExiste) {
        return {error: 'El email ya esta registrado.'};
      }

      // Buscar el id del rol
      const rolUsuario =  await usuarioRepository.buscarRolPorNombre(rol.toUpperCase());

      if (!rolUsuario) {
        return {error: `El rol ${rol} no es un rol valido.`};
      }


      const nuevoUsuarioData = {
        email : email,
        password : password,
        nombre : nombre,
        rol: rolUsuario._id
      };

      const nuevoUsuario = await usuarioRepository.agregarUsuario(nuevoUsuarioData);
      
      return nuevoUsuario;
    } catch (error) {
      return { error };
    }
  }

  // ========== Metodos privados ============


  _obtenerRutaHome(rol = '') {
    if (rol === Roles.ADMIN) {
      return '/admin/home';
    }
    else if (rol === Roles.COORDINADOR) {
      return '/coordinador/home';
    }
    else {
      return null;
    }
  }

  /**
   * Simula la comparación de una contraseña sin encriptar con una encriptada.
   *
   * @private
   * @param {string} passwordPlano - Contraseña enviada en la solicitud (texto plano).
   * @param {string} passwordGuardada - Contraseña almacenada en la base de datos.
   * @returns {boolean} `true` si las contraseñas son idénticas, `false` en caso contrario.
   */
  _simularComparacionPassword(passwordPlano = "", passwordGuardada = "") {
    // Simulación: se considera válida si ambas son idénticas
    // (aunque la guardada está "encriptada" simbólicamente)

    return passwordGuardada === passwordPlano;
  }

  /**
   * Valida los datos del nuevo usuario antes del registro.
   *
   * @private
   * @async
   * @param {Object} usuarioData - Datos del usuario.
   * @returns {Promise<string[]>} Lista de errores de validación (vacía si no hay errores).
   */
  _simularGeneracionToken(usuario) {
    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre,
      emitidoEn: new Date().toISOString(),
    };

    // Convertimos el payload a base64 para simular un token
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    const tokenFalso = `${base64Payload}`;

    return tokenFalso;
  }

}

export default new AutenticacionService();
