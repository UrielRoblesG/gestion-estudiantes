import { request, response } from "express";



/**
 * Middleware para validar el rol de un usuario antes de permitir el acceso a una ruta.
 * 
 * Este middleware revisa el header `tipo-usuario` de la solicitud y compara
 * el valor contra un arreglo de roles permitidos. Si el rol está permitido,
 * la solicitud continúa; de lo contrario, se devuelve un error HTTP 403.
 * 
 * También registra en consola los intentos de acceso, indicando:
 * - Tipo de usuario
 * - Método HTTP
 * - Ruta solicitada
 * - Fecha y hora UTC
 * 
 * @param {string[]} rolesPermitidos - Array de roles válidos para acceder a la ruta.
 * @returns {import('express').RequestHandler} Middleware de Express.
 * 
 * @example
 * // Permitir solo administradores y coordinadores:
 * router.post('/api/alumnos', validarRol([Roles.ADMIN, Roles.COORDINADOR]), crearAlumno);
 */
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
