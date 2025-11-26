import mongoose from "mongoose";
import configService from "../utils/config.service.js";

const Status = Object.freeze({
  DESCONECTADO: "desconectado",
  CONECTADO: "conectado",
  ERROR: "error",
});

class Database {
  constructor() {
    if (Database.instance) return Database.instance;

    this.Status = Status.DESCONECTADO;
    Database.instance = this;
  }

  async conectar() {
    if (this.Status === Status.CONECTADO) return;

    try {
      await mongoose.connect(configService.DATABASE_URI, {
        serverApi: {
          version: "1",
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS: 30000, // 30s para conectar
        serverSelectionTimeoutMS: 30000, // 30s para selección de servidor
      });

      console.log("Conexión establecida con la BD");
      this.Status = Status.CONECTADO;

      this.configurarListeners();
    } catch (error) {
      console.error("Error al conectar con MongoDB:", error);
      this.Status = Status.ERROR;
      // No hacer exit; Render reintentara automáticamente la conexion
    }
  }

  configurarListeners() {
    mongoose.connection.on("error", (err) => {
      console.error("Error en Mongoose:", err);
      // No hacer exit; Render reintentara automáticamente la conexion
    });

    // Cierre ordenado local
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    // Cierre ordenado en Render
    process.on("SIGTERM", async () => {
      console.log("Render está apagando el servicio...");
      await mongoose.connection.close();
      process.exit(0);
    });
  }
}

const database = new Database();

export default database;
