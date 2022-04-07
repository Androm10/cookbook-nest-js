import { IsEmail, MaxLength, MinLength,  } from 'class-validator';

export class SignupDto {
    
    @IsEmail()
    login: string;
    
    @MaxLength(30)
    @MinLength(8)
    password: string;
    
    @MaxLength(20)
    @MinLength(3)
    username: string;
}