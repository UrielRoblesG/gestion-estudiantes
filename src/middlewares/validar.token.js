import { request, response } from "express";

import { Roles } from "../types/roles.js";
import {verificarToken} from '../utils/jwt.generator.js';
/**
 * Decodifica una cadena Base64 que se espera contenga un objeto JSON y lo convierte a un objeto JavaScript.
 *
 * Esta función es esencial para extraer la información (payload) de un token (como un JWT simple
 * o un payload codificado en Base64) en un entorno Node.js/servidor.
 *
 * @param {string} [token=""] - La cadena de texto Base64 a decodificar.
 * @returns {object | null} El objeto JavaScript decodificado (el payload del token),
 * o `null` si la cadena de entrada es inválida, está vacía, o el parseo JSON falla.
 */
const tokenParser = (token = "") => {
  const decodedData = verificarToken(token);

  return decodedData;
};

/**
 * Middleware para validar la autenticidad y el rol de un usuario basado en un token JWT (simulado).
 *
 * 1. Extrae el token del encabezado 'Authorization' (espera el formato 'Bearer <token>').
 * 2. Decodifica el token usando `tokenParser` para obtener el payload del usuario.
 * 3. Valida que el rol del usuario decodificado exista dentro de las constantes 'Roles'.
 * 4. Si es exitoso, inyecta el rol del usuario en `req.headers["tipo-usuario"]` y llama a `next()`.
 * 5. Si falla la validación del rol, responde con un estado 401 (No Autorizado).
 *
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response} res - Objeto de respuesta de Express.
 * @param {express.NextFunction} next - Función para pasar el control al siguiente middleware/controlador.
 * @returns {void | express.Response} Llama a `next()` o retorna una respuesta de error 401.
 *
 * @requires Buffer - Para la decodificación Base64 en `tokenParser`.
 * @requires Roles - Objeto de constantes con los roles válidos (ADMIN, COORDINADOR, ALUMNO).
 */
export const validarToken = (req = request, res = response, next) => {
  // Extraer el encabezado de autorización
  const token = req.cookies?.token;

  // Manejar token no presente o en formato incorrecto (solo Bearer)  
  if (!token && req.baseUrl.includes("api")) {
    return res.status(401).json({
      mensaje: "Token de autorización faltante o con formato incorrecto",
      error: "Se esperaba el formato 'Bearer <token>'",
    });
  }
  else if(!token && !req.baseUrl.includes('api'))
    return res.redirect('/login');
  
  // Decodificar el payload del token
  const user = tokenParser(token);

  // Si el token no se pudo parsear (inválido, expirado, etc.)
  if (!user) {
    return res.status(401).json({
      mensaje: "Token inválido o corrupto",
      error: "El token no pudo ser decodificado correctamente.",
    });
  }

  let tipoUsuario = "";

  // Validar que el rol decodificado sea uno de los roles esperados
  if (user.rol == Roles.ADMIN) {
    tipoUsuario = Roles.ADMIN;
  } else if (user.rol == Roles.COORDINADOR) {
    tipoUsuario = Roles.COORDINADOR;
  } else if (user.rol == Roles.ALUMNO) {
    tipoUsuario = Roles.ALUMNO;
  } else {
    // Si el rol existe pero no coincide con los roles conocidos
    return res.status(401).json({
      mensaje: "Token invalido",
      error: "El rol dentro del token no es reconocido o ha sido manipulado",
    });
  }

  // Inyectar el tipo de usuario validado en los headers de la solicitud para uso posterior
  req.headers["tipo-usuario"] = tipoUsuario;
  // Continuar con el siguiente manejador de la ruta
  next();
};
