import { Module } from '@nestjs/common';
import { CookbookModule } from './modules/cookbook/cookbook.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import config from './services/config';
import { MulterModule } from '@nestjs/platform-express';

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
		MulterModule.registerAsync({
			useFactory : async (configService : ConfigService) => ({
				dest : configService.get('assetsDir')
			}),
			inject : [ConfigService]
		})
	],
	controllers: [],
})
export class AppModule {}
