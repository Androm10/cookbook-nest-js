import { IsOptional, IsIn } from 'class-validator';
import { StatusTypes } from '../entities/user.entity';

export class UpdateUserDto {

    @IsOptional()
    login?: string;
    
    @IsOptional()
    @IsIn(Array.from(StatusTypes))
    status?: string
}