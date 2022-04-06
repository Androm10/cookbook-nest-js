import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserService } from '../services/user.service';
import { isAdmin } from 'src/middlewares/isAdmin/Guard';

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
    
    @UseGuards(AuthGuard('jwt'))
    @Put('updateProfile')
    async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
        return this.userService.updateProfile(req.user.id, updateProfileDto);
    }
    
    //admin
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(isAdmin)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    //admin
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(isAdmin)
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateById(+id, updateUserDto);
    }

    //admin
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(isAdmin)
    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return this.userService.deleteById(+id);
    }

    


}
