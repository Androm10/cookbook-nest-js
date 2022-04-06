import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../user/services/user.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService : JwtService) {}
    
    async validateUser(id: number) {
        try {
            const user = await this.userService.getById(id);
            return user;
        }
        catch(error) {
            return null;
        }
    }

    async logIn(user: any) {

        const found = await this.userService.getByLogin(user.login); 
        
        if(found?.login != user.login) {
            throw new BadRequestException('Login or password is incorrect');
        }
        if(!bcrypt.compareSync(user.password, found.password)) {
            throw new BadRequestException('Login or password is incorrect');
        }
    
        const payload = {userId: found.id};

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async signUp(userData: any) {

        if(await this.userService.getByLogin(userData.login)) {
            throw new BadRequestException('User with such login already exists');
        }

        return await this.userService.registerUser({status: "active", ...userData});

    }

}