
import dbConnector from "../config/db.connector.js";
import { Rol } from "../Models/rol.model.js";

class RolRespository {
    async obtenerRolPorNombre(nombre = '') {
        try {
            await dbConnector.conectar();
            const rol = await Rol.findOne({nombre: nombre});
            return {rol};
        } catch (error) {
            return {error: error};
        }   
        finally {
            await dbConnector.desconectar();
        }    
    }
}

const rolRepository= new RolRespository();

export default rolRepository;