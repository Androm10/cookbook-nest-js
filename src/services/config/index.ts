import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(`${process.env.NODE_ENVIRONMENT}.env`) });

export default () => ({
	database: {
		name: process.env.DB_NAME || 'cookbook',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASS || '1111',
		host: process.env.DB_HOST || 'localhost',
		port: +process.env.DB_PORT || 3307,
	},
	auth: {
		secret: process.env.SECRET || 'secret',
		expiresIn: '2h',
	},
	rateLimit: {
		ttl: 60,
		limit: 10,
	},
	assetsDir: process.env.ASSETS_DIR || path.resolve('assets'),
	amqp: {
		url: process.env.RMQ_URL || 'amqp://localhost:5672',
		durable: process.env.RMQ_DURABLE || false,
	},
    logger: {
        queue: 'logs'
    },
	mongodb: {
		connection: process.env.MONGO || '' 
	}


});
