import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RMQ_BROKER } from 'src/constants/rabbitmq';
import { BrokerModuleOptions } from 'src/interfaces/arguments/broker-options';

@Module({})
export class BrokerModule {
	static async forRootAsync(
		options: BrokerModuleOptions,
	): Promise<DynamicModule> {
		return {
			module: BrokerModule,
			global: true,
			imports: options.imports || [],
			providers: this.createAsyncProviders(options),
			exports: [RMQ_BROKER],
		};
	}

	private static createAsyncProviders(
		options: BrokerModuleOptions,
	): Provider[] {
		if (options.useExisting || options.useFactory) {
			return [this.createBroker(options)];
		}
		return [
			this.createBroker(options),
			{
				provide: options.useClass,
				useClass: options.useClass,
			},
		];
	}

	private static createBroker(options: BrokerModuleOptions): Provider {
		if (options.useFactory) {
			return {
				provide: RMQ_BROKER,
				useFactory: options.useFactory,
				inject: options.inject || [],
			};
		}
		if (options.useClass) {
			return {
				provide: RMQ_BROKER,
				useClass: options.useClass,
			};
		}
		return {
			provide: RMQ_BROKER,
			useExisting: options.useExisting,
		};
	}
}
