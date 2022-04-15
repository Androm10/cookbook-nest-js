import { Module } from '@nestjs/common';
import { CookbookModule } from './modules/cookbook/cookbook.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import config from './services/config';
import { RabbitBroker } from './services/rabbitmq/broker.service';
import { BrokerModule } from './services/rabbitmq/broker.module';


@Module({
	imports: [CookbookModule, 
		RecipeModule,
		UserModule, 
		AuthModule,
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true
		}),
		ThrottlerModule.forRootAsync({
			useFactory : async (configService : ConfigService) => ({
					limit : configService.get('rateLimit.limit'),
					ttl : configService.get('rateLimit.ttl')
				}),
			inject : [ConfigService]
		}),
		BrokerModule.forRootAsync({
			useFactory: async (configService : ConfigService) => {
				const options = {
					url: configService.get('amqp.url'),
					durable: configService.get('amqp.durable')
				}
				const broker = new RabbitBroker(options);
				await broker.init();
				return  broker;
			},
			inject: [ConfigService]
		}),
	],
	providers: [],
	controllers: [],
	exports: []
})
export class AppModule {}
