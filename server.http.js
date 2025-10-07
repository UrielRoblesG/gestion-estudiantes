

import http from 'node:http';


const server = http.createServer((req, res) => {
    const {url} = req;
    switch (url) {
        case '/':
            res.write('Bienvenido al servidor.');
            break;
        case '/acerca':
            res.write('Este es un servidor hecho con node.JS y http');
            break;
        case '/contacto':
            res.write('Contacto: dasw@email.com');
            break;
        default:
            res.statusCode = 404;
            res.write('Ruta no implementada');
            break;
    }
    res.end();
});


const host = '127.0.0.1';
const port = 3000;

server.listen(port, host, () => {
    console.log(`Servidor a la escucha en http://${host}:${port}/`);
})