import { Global, Module } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/repositories';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Global()
@Module({
	controllers: [UserController],
	providers: [UserService, { provide: USER_REPOSITORY, useClass: UserRepository } ],
	exports: [UserService, USER_REPOSITORY]
})
export class UserModule {}
