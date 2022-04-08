import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserService } from '../services/user.service';
import { CheckRoles } from 'src/middlewares/CheckRoles/Guard';
import { Roles } from 'src/middlewares/CheckRoles/Decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.userService.getById(+id);
    }
    
    @Get()
    async getAll(@Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) page: number) {
        return this.userService.getAll(limit, page);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put('updateProfile')
    async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
        return this.userService.updateProfile(req.user.id, updateProfileDto);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put('changePassword')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req) {
        return this.userService.changePassword(changePasswordDto, req.user.id);
    }

    //admin
    @Post()
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    //admin
    @Put(':id')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateById(+id, updateUserDto);
    }

    //admin
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async deleteById(@Param('id') id: string) {
        return this.userService.deleteById(+id);
    }

    


}
