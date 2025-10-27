




/**
 * Middleware de manejo global de errores del servidor.
 * 
 * Este middleware captura cualquier error que ocurra durante la ejecución
 * de los controladores o middlewares previos en la cadena de Express,
 * evitando que el servidor se caiga y proporcionando una respuesta JSON
 * estándar con información del error.
 * 
 * Funcionalidad:
 * - Imprime el error completo en la consola del servidor.
 * - Devuelve una respuesta HTTP 500 (Internal Server Error).
 * - Envía un objeto JSON con un mensaje general y el mensaje del error.
 * 
 * Ejemplo de respuesta:
 * ```json
 * {
 *   "mensaje": "Algo fallo en el server",
 *   "error": "ReferenceError: variable is not defined"
 * }
 * ```
 * 
 * @param {Error} err - Objeto de error capturado.
 * @param {import('express').Request} req - Objeto de solicitud Express.
 * @param {import('express').Response} res - Objeto de respuesta Express.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 */
export const handleServerErrors = (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        mensaje: 'Algo fallo en el server',
        error: err.message
    });
}