import {
	IsNotEmpty,
	MaxLength,
	MinLength,
	IsInt,
	Min,
	IsOptional,
} from 'class-validator';

export class CreateRecipeDto {
	@MaxLength(30)
	@MinLength(3)
	name: string;

	@IsOptional()
	avatar: string;

	@IsOptional()
	description: string;

	@IsNotEmpty()
	directions: string;

	@IsNotEmpty()
	ingridients: string;

	@Min(0)
	@IsInt()
	cookingTime: number;
}
