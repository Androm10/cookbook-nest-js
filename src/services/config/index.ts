import * as dotenv from 'dotenv';
const env = dotenv.config();

export const config = {
    database : {
        name: process.env.DB_NAME || "cookbook",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "1111",
        host: process.env.DB_HOST || "localhost",
        port: +process.env.DB_PORT || 3307
    },
}