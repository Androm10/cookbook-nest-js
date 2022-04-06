import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/modules/user/services/user.service";



@Injectable()
export class isAdmin implements CanActivate {
    constructor(private userService: UserService, private reflector: Reflector) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('role guard');
        
        const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!allowedRoles)
            return true;

        const user = context.switchToHttp().getRequest().user;
        
        const roles = await this.userService.getRoles(user.id);
    
        return roles.reduce((prev, cur) => {
            return prev && allowedRoles.includes(cur);
        }, true);
    }

}