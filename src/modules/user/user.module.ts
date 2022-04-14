import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { USER_REPOSITORY } from 'src/constants/repositories';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
	imports: [MulterModule.registerAsync({
		useFactory : async (configService : ConfigService) => ({
			dest : configService.get('assetsDir') + '/user',
			preservePath : true
		}),
		inject : [ConfigService]
	})],
	controllers: [UserController],
	providers: [UserService, { provide: USER_REPOSITORY, useClass: UserRepository } ],
	exports: [UserService, USER_REPOSITORY]
})
export class UserModule {}
