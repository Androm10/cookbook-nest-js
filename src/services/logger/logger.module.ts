import { Module } from '@nestjs/common';
import { APP_LOGGER, LOGGER_QUEUE } from 'src/constants/logger';
import { RMQ_BROKER } from 'src/constants/rabbitmq';
import rmqLoggerFactory from './rmq logger/rmq-logger.factory';

@Module({
	providers: [rmqLoggerFactory(APP_LOGGER, RMQ_BROKER, LOGGER_QUEUE)],
	exports: [APP_LOGGER],
})
export class LoggerModule {}
