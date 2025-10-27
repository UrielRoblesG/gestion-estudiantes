import { request, response } from "express";

import { Roles } from "../types/roles.js";



/**
 * Middleware para validar el token de autorización y asignar un rol de usuario.
 * 
 * Este middleware revisa el header `authorization` de la solicitud y, según el contenido
 * del token (simulado en este ejemplo), determina el tipo de usuario (rol):
 * - Contiene "tipo1" → ADMIN
 * - Contiene "tipo2" → COORDINADOR
 * - Contiene "tipo3" → ALUMNO
 * 
 * Luego agrega el rol correspondiente en `req.headers["tipo-usuario"]` para que
 * otros middlewares, como `validarRol`, puedan usarlo.
 * 
 * Si el token no coincide con ninguno de los tipos esperados, devuelve un
 * error HTTP 401 (Unauthorized) indicando que el token es inválido.
 * 
 * También registra en consola el contenido de los headers después de asignar el rol.
 * 
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función que transfiere el control al siguiente middleware.
 */
export const validarToken = (req = request, res = response, next) => {
  const { authorization } = req.headers;

  let tipoUsuario = "";

  if (authorization.includes("tipo1")) tipoUsuario = Roles.ADMIN;
  else if (authorization.includes("tipo2")) tipoUsuario = Roles.COORDINADOR;
  else if (authorization.includes("tipo3")) tipoUsuario = Roles.ALUMNO;
  else
    return res.status(401).json({
      mensaje: "Token invalido",
      error: "El token ha sido manipulado",
    });

  req.headers["tipo-usuario"] = tipoUsuario;

  console.log(req.headers);
  next();
};
