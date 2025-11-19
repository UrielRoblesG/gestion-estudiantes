import { response, Router, request } from "express";

import { Rutas } from "../types/rutas.js";

const route = Router();

route.get("/login", (req = request, res = response) => {
  const url = `${req.url}`;

  const path = Rutas.Auth[url];
  res.sendFile(path);
});

route.get("/registro", (req = request, res = response) => {
  const url = `${req.url}`;

  const path = Rutas.Auth[url];
  res.sendFile(path);
});

export default route;
