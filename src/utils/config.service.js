
import "dotenv/config.js";


class ConfigService {
    constructor(){
        this.PORT = process.env.PORT;
        this.HOST = process.env.HOST;
        this.DATABASE_CONNECTION = process.env.HOST;
    }
}

const configService = new ConfigService();

export default configService;