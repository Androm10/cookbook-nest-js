import { IsOptional, MaxLength, MinLength} from 'class-validator';

export class CreateCookbookDto {
    
    @MinLength(3)
    @MaxLength(30)
    name: string;
    
    @IsOptional()
    avatar: string;
    
    @IsOptional()
    description: string;
}