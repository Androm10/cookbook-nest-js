import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/middlewares/check-roles.middleware';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class CheckRolesGuard implements CanActivate {
	constructor(
		private userService: UserService,
		private reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const allowedRoles = this.reflector.get<string[]>(
			ROLES,
			context.getHandler(),
		);
		if (!allowedRoles) return true;

		const user = context.switchToHttp().getRequest().user;

		const roles = await this.userService.getRoles(user.id);

		return allowedRoles.reduce((prev, cur) => {
			return prev && roles.map((role) => role.name).includes(cur);
		}, true);
	}
}
