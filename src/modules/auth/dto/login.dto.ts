import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
	@IsEmail()
	login: string;

	password: string;
}
