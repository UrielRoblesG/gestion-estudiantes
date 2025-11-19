
import jwt from 'jsonwebtoken';

import configService from "./config.service.js";


export const generarJWT = (payload, expiresIn = '1h') => {
    try {
        
        const opciones = {
            expiresIn : expiresIn,
            issuer : 'gestion-estudiantes-api' 
        };

        const token = jwt.sign(payload, configService.SECRET, opciones);

        console.log(`JWT: ${token}`);
        return token;
    } catch (error) {
        console.error(`Error durante la generacion del token. Error: ${error.message}`);
        return null;
    }
}

export const verificarToken = (token) => {
    try {
        
        const decodedData = jwt.verify(token, configService.SECRET);

        return decodedData;
    } catch (error) {
        console.error(`Error de verificacion de JWT. Error: ${error.message}`);
        return null;
    }
}