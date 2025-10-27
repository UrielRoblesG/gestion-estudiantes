/**
 * @fileoverview Define las constantes inmutables para las rutas (paths) físicas
 * de las vistas del front-end, utilizando la ruta raíz del proyecto como base.
 */

/**
 * @constant
 * @type {Readonly<{Auth: Readonly<{[key: string]: string}>}>}
 * @description Objeto inmutable que almacena la ubicación física de los archivos HTML
 * de las vistas del front-end, agrupadas por su contexto lógico (e.g., Auth).
 */
export const Routas = Object.freeze({
    /**
     * @constant
     * @type {Readonly<{[key: string]: string}>}
     * @description Rutas relativas a la autenticación y gestión de usuarios.
     * @property {string} '/login' Ruta absoluta al archivo 'login.html'.
     * @property {string} '/registro' Ruta absoluta al archivo 'registro.html'.
     */
    Auth : {
        '/login' : `${rutaRaizProyecto}/front-end/views/login.html`,
        '/registro' : `${rutaRaizProyecto}/front-end/views/registro.html`
    },
});