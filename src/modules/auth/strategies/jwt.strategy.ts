import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(private authService: AuthService, private configService: ConfigService) {
		super({
		secretOrKey: configService.get<string>('auth.secret'), 
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: any): Promise<any> {
		const id = payload.userId;
		const user = await this.authService.validateUser(id);
		if(!user) {
			throw new UnauthorizedException();
		}
		return user;
	}

}