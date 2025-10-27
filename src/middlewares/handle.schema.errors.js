import { validationResult } from "express-validator";
import { request, response } from "express";


/**
 * Middleware de manejo de errores de validación (express-validator).
 * 
 * Este middleware se encarga de verificar los resultados de las validaciones
 * definidas mediante `checkSchema`, `body`, `param`, u otros validadores de
 * **express-validator**. Si existen errores, corta la ejecución de la cadena
 * de middlewares y devuelve una respuesta HTTP 403 con el detalle de los errores.
 * 
 * Funcionalidad:
 * - Verifica si existen errores de validación en la solicitud.
 * - En caso de errores, responde con un JSON detallando los campos inválidos.
 * - Si no hay errores, continúa con el siguiente middleware o controlador.
 * 
 * Ejemplo de respuesta:
 * ```json
 * {
 *   "mensaje": "Los campos ingresados no cumplen con las validaciones",
 *   "errores": [
 *     { "type": "field", "msg": "El email no es válido", "path": "email", "location": "body" }
 *   ]
 * }
 * ```
 * 
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 */
export const handleSchemaErrors = (req = request, res = response, next) => {


    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(403).json({
            mensaje: 'Los campos ingresados no cumplen con las validaciones',
            errores : errors.array()
        })
    }
        
    next();
};
