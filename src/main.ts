import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { APP_LOGGER } from './constants/logger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet({
		crossOriginResourcePolicy: false
	}));
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);
	await app.listen(3000);
}
bootstrap();
