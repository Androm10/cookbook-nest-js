import { IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileDto {

    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    username?: string;
    
    @IsOptional()
    info?: string
}