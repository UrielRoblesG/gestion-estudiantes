/**
 * @fileoverview Constantes para los roles de usuario.
 * Define los diferentes niveles de acceso y permisos dentro de la aplicación.
 */

/**
 * @constant
 * @type {Readonly<{ADMIN: string, COORDINADOR: string, ALUMNO: string}>}
 * @description Objeto inmutable (congelado) que contiene las constantes para los roles de usuario.
 * @property {string} ADMIN El rol con los máximos permisos, típicamente para la administración del sistema.
 * @property {string} COORDINADOR El rol con permisos intermedios, a menudo para la gestión de secciones o equipos.
 * @property {string} ALUMNO El rol con permisos limitados, asociado a un usuario final o estudiante.
 */
export const Roles = Object.freeze({
    ADMIN : 'ADMIN',
    COORDINADOR : 'COORDINADOR',
    ALUMNO: 'ALUMNO'
});
