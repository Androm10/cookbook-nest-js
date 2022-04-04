import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.userService.getById(+id);
    }

    @Get()
    async getAll() {
        return this.userService.getAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateById(+id, updateUserDto);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return this.userService.deleteById(+id);
    }


}
