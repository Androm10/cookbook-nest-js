import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { RMQ_BROKER } from 'src/constants/rabbitmq';
import { RabbitBroker } from 'src/services/rabbitmq/broker.service';
import { MAILER_QUEUE, MAIL_TYPES } from 'src/constants/mailer';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		@Inject(RMQ_BROKER) private broker: RabbitBroker,
	) {}

	async validateUser(id: number) {
		try {
			const user = await this.userService.getById(id);
			return user;
		} catch (error) {
			return null;
		}
	}

	async logIn(user: any) {
		const found = await this.userService.getByLogin(user.login);

		if (found?.login != user.login) {
			throw new BadRequestException('Login or password is incorrect');
		}
		if (!bcrypt.compareSync(user.password, found.password)) {
			throw new BadRequestException('Login or password is incorrect');
		}

		const payload = { userId: found.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async signUp(userData: any) {
		if (await this.userService.getByLogin(userData.login)) {
			throw new BadRequestException(
				'User with such login already exists',
			);
		}

		this.broker.sendMessage(MAILER_QUEUE, {
			type: MAIL_TYPES.WELCOME_MAIL,
			to: userData.login,
		});

		return await this.userService.registerUser({
			status: 'active',
			...userData,
		});
	}
}
