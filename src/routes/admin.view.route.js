import { Router } from "express";
import { Rutas } from "../types/rutas.js";

const router = Router();

//* Middleware para validar token
//* Middleware para validar Rol ADMIN

router.get('/home', (req, res) => {
    
    const path = `${req.baseUrl}${req.url}`;
    res.sendFile(Rutas.Admin[path]);
});


router.get('/alumno/:id', (req, res) => {
    const reqPath = req.url.split('/')[1];
    const ruta = `${req.baseUrl}/${reqPath}` ;
    const path = Rutas.Admin[ruta];
    res.sendFile(path);
})

export default router;