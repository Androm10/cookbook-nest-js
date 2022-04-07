import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';
import { StatusTypes } from '../entities/user.entity';

export class CreateUserDto {
    @IsEmail()
    login: string;

    @IsNotEmpty()
    password: string;

    @IsIn(Array.from(StatusTypes))
    status: string
}