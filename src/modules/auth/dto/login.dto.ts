import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
    
    @IsEmail()
    login: string;

    @MaxLength(30)
    @MinLength(8)
    password: string;
}