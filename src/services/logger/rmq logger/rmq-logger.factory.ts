import { ConfigService } from '@nestjs/config';
import { Broker } from 'src/interfaces/arguments/broker-options';
import { RmqLogger } from './rmq-logger.service';

export default (provideToken: string, brokerToken: string, queueToken?: string) => ({
	provide: provideToken,
	useFactory: (configService: ConfigService, broker: Broker) => {
		const options = {
			queue: queueToken || configService.get('logger.queue'),
		};
		return new RmqLogger(options, broker);
	},
	inject: [ConfigService, {token: brokerToken, optional: false}],
});
