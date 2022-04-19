import {
	Controller,
	Param,
	Get,
	Post,
	Body,
	Put,
	Delete,
	UseGuards,
	Req,
	Query,
	ParseIntPipe,
	UploadedFile,
	UseInterceptors,
	StreamableFile,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserService } from '../services/user.service';
import { Roles } from 'src/middlewares/check-roles.middleware';
import { ThrottlerGuard } from '@nestjs/throttler';
import { NoAuth } from 'src/middlewares/no-auth.middleware';
import { Statuses } from 'src/middlewares/check-status.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResetRequestDto } from '../dto/reset-request.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@NoAuth()
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.userService.getById(id);
	}

	@Get()
	@NoAuth()
	async getAll(
		@Query('limit', ParseIntPipe) limit: number,
		@Query('page', ParseIntPipe) page: number,
	) {
		return this.userService.getAll(limit, page);
	}

	@Put('updateProfile')
	@Statuses('active')
	async updateProfile(
		@Req() req,
		@Body() updateProfileDto: UpdateProfileDto,
	) {
		return this.userService.updateProfile(req.user.id, updateProfileDto);
	}

	@UseGuards(ThrottlerGuard)
	@Put('changePassword')
	@Statuses('active')
	async changePassword(
		@Body() changePasswordDto: ChangePasswordDto,
		@Req() req,
	) {
		return this.userService.changePassword(changePasswordDto, req.user.id);
	}

	@Post('/uploadAvatar')
	@UseInterceptors(FileInterceptor('file'))
	@Statuses('active')
	async uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
		return this.userService.uploadAvatar(file, req.user.id);
	}

	@Get(':id/avatar')
	@NoAuth()
	@Statuses('active')
	async getAvatar(
		@Param('id', ParseIntPipe) id: number,
	): Promise<StreamableFile> {
		return this.userService.getAvatar(id);
	}

	@Get(':id/profile')
	@Statuses('active')
	async getProfile(@Param('id', ParseIntPipe) id: number) {
		return this.userService.getProfile(id);
	}

	@Post('resetPassword')
	@NoAuth()
	async resetRequest(@Body() resetRequestDto: ResetRequestDto) {
		return this.userService.resetRequest(resetRequestDto.login);
	}

	@Post()
	@Roles('Admin')
	@Statuses('active')
	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Put(':id')
	@Roles('Admin')
	@Statuses('active')
	async updateById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.userService.updateById(id, updateUserDto);
	}

	@Delete(':id')
	@Roles('Admin')
	@Statuses('active')
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		return this.userService.deleteById(id);
	}

	@Get('stats/status')
	@Roles('Admin')
	@Statuses('active')
	async getStatusStats() {
		return this.userService.getStatusStats();
	}

	@Get('stats/mostActive')
	@Roles('Admin')
	@Statuses('active')
	async getMostActive() {
		return this.userService.mostActive();
	}
}
