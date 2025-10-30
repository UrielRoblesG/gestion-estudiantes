import { Router } from "express";

import { Rutas } from "../types/rutas.js";

const route = Router();

route.get("/login", (req, res) => {
  const url = `${req.url}`;

  const path = Rutas.Auth[url];
  console.log(path);
  res.sendFile(path);
});

export default route;
