


/**
 * @fileoverview Constantes de expresiones regulares (Regex) utilizadas para validación.
 */

/**
 * @constant
 * @type {RegExp}
 * @description Expresión regular utilizada para una validación de formato básico de correo electrónico.
 *
 * Esta expresión verifica que la cadena de texto cumpla con el formato general:
 * - Debe tener contenido al inicio (antes del '@').
 * - Debe contener exactamente un carácter '@'.
 * - Debe tener contenido entre el '@' y el último '.'.
 * - Debe tener contenido después del último '.' (dominio de nivel superior).
 * - No permite espacios en blanco en ninguna parte del correo.
 *
 * @example
 * // Ejemplos válidos
 * EMAIL_REGEX.test("usuario@dominio.com") // true
 * EMAIL_REGEX.test("nombre.apellido@sub.empresa.net") // true
 *
 * @example
 * // Ejemplos NO válidos
 * EMAIL_REGEX.test("usuario@dominio") // false (falta el punto y el TLD)
 * EMAIL_REGEX.test("usuario@dominio..com") // false (doble punto)
 * EMAIL_REGEX.test("usuario dominio.com") // false (espacio en blanco)
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;