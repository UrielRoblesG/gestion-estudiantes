import { request, response } from "express";

export const validarRol = (rolesPermitidos = []) => {
  return (req = request, res = response, next) => {

    const tipoUsuario = req.headers['tipo-usuario'];
    
    console.log(`Intento de acceso - Tipo usuario: ${tipoUsuario} - Ruta ${req.method} ${req.originalUrl} - Fecha ${new Date().toUTCString()}`);

    if (!tipoUsuario) {
      return res.status(400)
        .json({mensaje: 'No se logro obtener el tipo-usuario'});
    }


    if (rolesPermitidos.includes(tipoUsuario)) {
      return next();
    }

    return res.status(403).json({
      mensaje: 'Acceso no autorizado. Tipo de usuario no permitido.'
    });
  };
};
