import { request, response } from "express";

import { Roles } from "../types/roles.js";

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
