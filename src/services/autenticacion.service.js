import usuarioRepository from "../repositories/usuario.repository.js";
import { Usuario } from "../Models/usuario.js";
import { EMAIL_REGEX } from "../utils/email.exp.js";

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
   * @returns {Promise<{token?: string, error?: string}>}
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

      const usuario = await usuarioRepository.buscarPorEmail(
        email.toLowerCase()
      );

      if (!usuario) {
        return {
          error: `No se encontro una cuenta asociada al email proporcionado ${email}`,
        };
      }

      // Simular comparación de contraseñas "encriptadas"
      // En la práctica se usaría bcrypt.compare(pass, usuario.password)
      const contrasenaValida = this._simularComparacionPassword(
        password,
        usuario.password
      );

      if (!contrasenaValida) {
        return { error: "Contraseña incorrecta" };
      }

      // Simular generación de JWT
      // En la práctica se usaría jsonwebtoken.sign(payload, secret, options)
      const tokenSimulado = this._simularGeneracionToken(usuario);

      return { token: tokenSimulado };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario en el sistema, validando los datos proporcionados.
   *
   * @async
   * @function registrarUsuario
   * @param {Object} nuevoUsuarioData - Datos del usuario a registrar.
   * @param {string} nuevoUsuarioData.nombre - Nombre completo del usuario.
   * @param {string} nuevoUsuarioData.email - Correo electrónico del usuario.
   * @param {string} nuevoUsuarioData.password - Contraseña del usuario.
   *
   * @example
   * const resultado = await autenticacionService.registrarUsuario({
   *   nombre: "Juan Pérez",
   *   email: "juan@example.com",
   *   password: "123456"
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
  async registrarUsuario(nuevoUsuarioData) {
    try {
      const errores = await this._validarUsuario(nuevoUsuarioData);

      if (errores.length > 0) {
        return { error: errores };
      }

      const nuevoUsuario = Usuario.fromObject(nuevoUsuarioData);

      const { error } = await usuarioRepository.agregarUsuario(nuevoUsuario);

      if (error) {
        return { error };
      }

      return { usuario: nuevoUsuario };
    } catch (error) {
      return { error };
    }
  }

  // ========== Metodos privados ============

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
      rol: usuario.rol || "usuario",
      emitidoEn: new Date().toISOString(),
    };

    // Convertimos el payload a base64 para simular un token
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    const tokenFalso = `FAKE.JWT.${base64Payload}`;

    return tokenFalso;
  }

  async _validarUsuario(usuarioData) {
    let errores = [];
    // a) Campos obligatorios
    const camposObligatorios = ["nombre", "email", "password"];

    for (const campo of camposObligatorios) {
      if (!usuarioData[campo]) {
        const err = `[Validacion] El campo '${campo}' es obligatorio.`;
        errores.push(err);
      }
    }

    // b) Validar formato de email
    if (!EMAIL_REGEX.test(usuarioData.email)) {
      errores.push("[Validacion] El formato del email es inválido.");
    }

    if (await usuarioRepository.buscarPorEmail(usuarioData.email)) {
      errores.push(
        `[Validacion] Ya existe un usuario registrado con el email: ${usuarioData.email}.`
      );
    }
    return errores;
  }
}

export default new AutenticacionService();
