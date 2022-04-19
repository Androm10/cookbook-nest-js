import { IsInt, Max, Min } from 'class-validator';

export class CreateCommentDto {
	text: string;

	@IsInt()
	@Max(5)
	@Min(1)
	rate: number;
}
