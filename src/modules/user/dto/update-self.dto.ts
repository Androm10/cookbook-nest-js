import { IsOptional } from 'class-validator';

export class UpdateSelfDto {
	@IsOptional()
	login?: string;

}
