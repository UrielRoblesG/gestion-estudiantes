import { fileURLToPath } from "node:url";
import path from 'node:path';

/**
 * @fileoverview Define las constantes inmutables para las rutas (paths) físicas
 * de las vistas del front-end, utilizando la ruta raíz del proyecto como base.
 */




//* Obtenemos la ruta del archivo actual ruta.js
const __filename = fileURLToPath(import.meta.url);

//* Obtenemos la ruta de la carpeta donde se encuentra el archivo /types/
const __dirname = path.dirname(__filename);

//* Subimos dos niveles de la carpeta actual para llegar a la carpeta raiz del proyecto.
const rutaRaizProyecto = path.resolve(__dirname, '../..');

/**
 * @constant
 * @type {Readonly<{Auth: Readonly<{[key: string]: string}>}>}
 * @description Objeto inmutable que almacena la ubicación física de los archivos HTML
 * de las vistas del front-end, agrupadas por su contexto lógico (e.g., Auth).
 */
export const Rutas = Object.freeze({
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
    Coordinador : {
        '/coordinador/home' : ``,
        '/coordinador/alumno' : `` 
    },
    Admin : {
        '/admin/home' : `${rutaRaizProyecto}/front-end/views/home.admin.html`,
        '/admin/coordinador/' : ``,
        '/admin/alumno' : `${rutaRaizProyecto}/front-end/views/alumno.html`,
        '/admin/editar' : `${rutaRaizProyecto}/front-end/views/editar.alumno.html`,
    },
});
