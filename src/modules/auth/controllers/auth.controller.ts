import { Controller, Param, Get, Post, Body, Put, Delete, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/singup.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/logIn')
    async logIn(@Req() req, @Body() loginDto: LoginDto) {
        return await this.authService.logIn(loginDto);
    }
    
    @Post('/signUp')
    async signUp(@Body() signupDto: SignupDto) {
       return await this.authService.signUp(signupDto);
    }
    
}
