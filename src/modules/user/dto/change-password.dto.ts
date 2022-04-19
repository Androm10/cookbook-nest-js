import { MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
	oldPassword: string;

	@MaxLength(30)
	@MinLength(8)
	newPassword: string;

	@MaxLength(30)
	@MinLength(8)
	newPasswordConfirm: string;
}
