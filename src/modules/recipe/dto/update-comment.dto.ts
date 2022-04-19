import { IsOptional, IsInt, Max, Min } from 'class-validator';

export class UpdateCommentDto {
	@IsOptional()
	text?: string;

	@IsOptional()
	@IsInt()
	@Max(5)
	@Min(1)
	rate?: number;
}
