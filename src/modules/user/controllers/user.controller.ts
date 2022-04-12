import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req, Query, ParseIntPipe, Patch } from '@nestjs/common';
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
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getById(id);
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

    @Post()
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async updateById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateById(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteById(id);
    }

    @Get('stats/status')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async getStatusStats() {
        return this.userService.getStatusStats();
    }
    
    @Get('stats/mostActive')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async getMostActive() {
        return this.userService.mostActive();
    }

}
