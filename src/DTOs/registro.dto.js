


import { checkSchema } from "express-validator";
import { Roles } from "../types/roles.js";

/**
 * Esquema de validación para la ruta /api/registro.
 * 
 * Este esquema define las reglas que deben cumplirse en el cuerpo (body)
 * de la solicitud HTTP para registrar un nuevo usuario en el sistema.
 * 
 * Campos validados:
 * 
 * - nombre:
 *   - Debe estar presente y no vacío.
 *   - Error: "El campo nombre es obligatorio".
 * 
 * - email:
 *   - Debe ser un correo electrónico válido.
 *   - No debe estar vacío.
 *   - Errores:
 *     - "El email no es válido"
 *     - "El campo email es obligatorio"
 * 
 * - password:
 *   - Debe tener entre 8 y 16 caracteres de longitud.
 *   - Error: "La contraseña no puede ser mayor a 16 ni menor a 8 caracteres".
 * 
 * - rol:
 *   - Debe pertenecer únicamente a los valores permitidos en `Roles.ADMIN` o `Roles.COORDINADOR`.
 *   - No debe estar vacío.
 *   - Errores:
 *     - "Rol inválido"
 *     - "El rol es obligatorio"
 * 
 * @constant
 * @type {import('express-validator').Schema}
 */
export const registroDTO = checkSchema({
    nombre : {
        notEmpty: {
            errorMessage: 'El campo nombre es obligatorio'
        },
    },
    email: {
        isEmail : {
            errorMessage: 'El email no es valido',
        },
        notEmpty: {
            errorMessage : 'El campo email es obligatorio'
        },
    },
    password : {
        isLength: {
            options: {min: 8, max: 16},
            errorMessage: 'La contraseña no puede ser mayor a 16 ni menor a 8 caracteres'
        }
    },
    rol : {
        isIn: {
            options: [Roles.ADMIN, Roles.COORDINADOR],
            errorMessage: 'Rol invalido'
        },
        notEmpty : {
            errorMessage: 'El rol es obligatorio'
        }
    },
});