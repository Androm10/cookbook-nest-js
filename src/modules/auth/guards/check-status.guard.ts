import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { STATUSES } from "src/middlewares/check-status.middleware";

@Injectable()
export class CheckStatusesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const allowedStatuses = this.reflector.get<string[]>(STATUSES, context.getHandler());
        if(!allowedStatuses) {
            return true;
        }        
        const user = context.switchToHttp().getRequest().user;
        
        return allowedStatuses.includes(user.status);
    }

}
