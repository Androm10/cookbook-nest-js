import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'src/services/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(private authService: AuthService) {
		super({
		secretOrKey: config.secret, 
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: any): Promise<any> {
		const id = payload.userId;
		const user = await this.authService.validateUser(id);
		if(!user) {
			throw new UnauthorizedException();
		}
		console.log('user generation');
		
		return user;
	}

}