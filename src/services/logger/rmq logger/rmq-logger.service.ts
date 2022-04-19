import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { Broker } from 'src/interfaces/arguments/broker-options';
import { RmqLoggerOptions } from 'src/interfaces/arguments/logger-options';

@Injectable()
export class RmqLogger implements LoggerService {
	constructor(private opts: RmqLoggerOptions, private broker: Broker) {
		//super();
	}

	log(message: any, level?: string, ...optionalParams: any[]) {
        //console.log('log', message, level, ...optionalParams);
        this.broker.sendMessage(this.opts.queue, { message, level });
		//super.log(message, level, ...optionalParams);
	}

	error(message: any, level?: string, ...optionalParams: any[]) {
        //console.log('error', message, level, ...optionalParams);
        this.broker.sendMessage(this.opts.queue, { message, level });
		//super.error(message, level, ...optionalParams);
	}

	warn(message: any, level?: string, ...optionalParams: any[]) {
        //console.log('warn', message, level, ...optionalParams);
        this.broker.sendMessage(this.opts.queue, { message, level });
		//super.error(message, level, ...optionalParams);
	}
}
