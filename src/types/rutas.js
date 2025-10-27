import { fileURLToPath } from "node:url";
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const rutaRaizProyecto = path.resolve(__dirname, '../..');

console.log('Ruta: ' , rutaRaizProyecto);

export const Routas = Object.freeze({
    Auth : {
        '/login' : `${rutaRaizProyecto}/front-end/views/login.html`,
        '/registro' : `${rutaRaizProyecto}/front-end/views/registro.html`
    },
});