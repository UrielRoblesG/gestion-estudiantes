
import "dotenv/config.js";

class ConfigService {
    constructor(){
        this.PORT = process.env.PORT || 3000;
        this.DATABASE_URI = process.env.DATABASE_URI;
        this.SECRET = process.env.SECRET;
        this.PRODUCTIVO = process.env.ENTORNO === 'PRODUCTION'
        this.HOST = this.PRODUCTIVO ? '0.0.0.0' : process.env.HOST;
    }
}

const configService = new ConfigService();

export default configService;