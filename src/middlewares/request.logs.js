

import {request, response} from 'express';

export const requestLogs = (req = request, res = response, next) => {
    // console.log('1. ConsoleLogger');
    const log = `[${new Date().toUTCString()}] Solicitud a ${req.method} ${req.originalUrl}`;
    console.log(log);
    next();
}