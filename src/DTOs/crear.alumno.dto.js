
import { checkSchema } from "express-validator";





/**
 * Esquema de validación para la creación de un alumno.
 * 
 * Este esquema se utiliza con express-validator para asegurar que los datos
 * enviados en el cuerpo de la solicitud cumplan con los requisitos mínimos
 * antes de ser procesados o almacenados en la base de datos.
 * 
 * Campos validados:
 * 
 * - nombre:
 *   - Obligatorio, no puede estar vacío ni contener solo espacios en blanco.
 *   - Error: "El nombre es obligatorio".
 * 
 * - apellidoPaterno:
 *   - Obligatorio, no puede estar vacío ni contener solo espacios.
 *   - Error: "El apellidoPaterno es obligatorio".
 * 
 * - apellidoMaterno:
 *   - Obligatorio, no puede estar vacío ni contener solo espacios.
 *   - Error: "El apellidoMaterno es obligatorio".
 * 
 * - fechaNacimiento:
 *   - Debe tener un formato de fecha válido (YYYY-MM-DD o ISO 8601).
 *   - Error: "La fecha no tiene un formato válido".
 * 
 * - email:
 *   - Debe ser un correo electrónico con formato válido.
 *   - Error: "El email no es un email válido".
 * 
 * - semestre:
 *   - Debe ser un número entero mayor o igual a 1.
 *   - Error: "El valor del semestre no es válido."
 * 
 * @constant
 * @type {import('express-validator').Schema}
 */
export const crearAlumnoDTO = checkSchema({
  nombre: {
    notEmpty: {
      errorMessage: "El nombre es obligatorio",
      options: {
        ignore_whitespace: true,
      },
    },
  },
  apellidoPaterno: {
    notEmpty: {
      errorMessage: "El apellidoPaterno es obligatorio",
      options: {
        ignore_whitespace: true,
      },
    },
  },
  apellidoMaterno: {
    notEmpty: {
      errorMessage: "El apellidoMaterno es obligatorio",
      options: {
        ignore_whitespace: true,
      },
    },
  },
  fechaNacimiento: {
    isDate: {
      errorMessage: "La fecha no tiene un formato valido",
    },
  },
  email: {
    isEmail: {
      errorMessage: "El email no es un email valido",
    },
  },
  semestre: {
    isInt: {
      options: { min: 1, errorMessage: 'El valor del semestre no es valido.', },
    },
  },
});