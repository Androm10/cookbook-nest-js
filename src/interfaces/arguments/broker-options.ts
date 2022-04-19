import { ModuleMetadata, Type } from '@nestjs/common';

export interface BrokerOptions {
	url: string;
	durable?: boolean;
}

export interface BrokerModuleOptions extends Pick<ModuleMetadata, 'imports'> {
	useExisting?: Type<Broker>;
	useClass?: Type<Broker>;
	useFactory?: (...args: any[]) => Promise<Broker> | Broker;
	inject?: any[];
}

export interface Broker {
	sendMessage(queue: string, message: any): Promise<void>;
	init(): Promise<void>;
}
