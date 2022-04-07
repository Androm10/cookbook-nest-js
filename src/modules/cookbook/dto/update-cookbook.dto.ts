import { IsOptional, MaxLength, MinLength} from 'class-validator';

export class UpdateCookbookDto {

    @IsOptional()
    @MaxLength(30)
    @MinLength(3)
    name?: string;
    
    @IsOptional()
    avatar?: string;
    
    @IsOptional()
    description?: string;
}