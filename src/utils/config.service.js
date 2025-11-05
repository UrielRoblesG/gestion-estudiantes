
import "dotenv/config.js";


class ConfigService {
    constructor(){
        this.PORT = process.env.PORT;
        this.HOST = process.env.HOST;
        this.DATABASE_URI = process.env.DATABASE_URI;
    }
}

const configService = new ConfigService();

export default configService;