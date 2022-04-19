import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NO_AUTH } from 'src/middlewares/no-auth.middleware';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const noAuth = this.reflector.getAllAndOverride(NO_AUTH, [
			context.getHandler(),
			context.getClass(),
		]);
		return noAuth ? true : super.canActivate(context);
	}
}
