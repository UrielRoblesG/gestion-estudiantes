
import "dotenv/config.js";

class ConfigService {
    constructor(){
        this.PORT = process.env.PORT || 3000;
        this.HOST = process.env.HOST;
        this.DATABASE_URI = process.env.DATABASE_URI;
        this.SECRET = process.env.SECRET;
    }
}

const configService = new ConfigService();

export default configService;