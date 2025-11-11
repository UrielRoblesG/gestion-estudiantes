
import mongoose from 'mongoose';
import configService from '../utils/config.service.js';


const Status = Object.freeze({
  DESCONECTADO : 'desconectado',
  CONECTADO : 'conectado',
  ERROR : 'error'
});

class Database {
  constructor() {

    if (Database.instance != null) {
      return Database.instance;
    }

    Database.instance = this;

    this.Status = Status.DESCONECTADO;
  }

  async conectar() {
    if (this.Status == Status.CONECTADO) 
      return;

    try {
      await mongoose.connect(configService.DATABASE_URI);
      console.log('Conexion establecida con la BD');
      this.Status = Status.CONECTADO;
      this.configurarListeners();
    } catch (error) {
      this.Status = Status.ERROR;
      process.exit(1);
    }
  }

  configurarListeners() {
    mongoose.connection.on('error', (err) => {
      console.error('Error de mongoose. ', err);
      process.exit(1);
    });

    process.on('SIGINT',  async () => {
      await mongoose.connection.close();
      process.exit(0);
    })
  }
}

const database = new Database();

export default database;
