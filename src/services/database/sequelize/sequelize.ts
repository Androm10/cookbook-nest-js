import { Sequelize } from 'sequelize';
import loadConfig from 'src/services/config';

const config = loadConfig();

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        dialect: 'mysql',
        host: config.database.host,
        port: config.database.port,
    }
    );

sequelize.authenticate()
    .catch(() => {
        console.log('cannot connect to database');
        return;
    });

console.log('connection to db completed');

export { sequelize };