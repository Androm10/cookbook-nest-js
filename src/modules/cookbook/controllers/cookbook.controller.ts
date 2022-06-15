import {
	Controller,
	Param,
	Get,
	Post,
	Body,
	Put,
	Delete,
	Req,
	Patch,
	Query,
	ParseIntPipe,
	UploadedFile,
	UseInterceptors,
	StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/middlewares/check-roles.middleware';
import { Statuses } from 'src/middlewares/check-status.middleware';
import { NoAuth } from 'src/middlewares/no-auth.middleware';
import { CreateCookbookDto } from '../dto/create-cookbook.dto';
import { UpdateCookbookDto } from '../dto/update-cookbook.dto';
import { CookbookService } from '../services/cookbook.service';

@Controller('cookbook')
export class CookbookController {
	constructor(private readonly cookbookService: CookbookService) {}

	@Get(':id')
	@NoAuth()
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.cookbookService.getById(id);
	}

	@Get()
	@NoAuth()
	async getAll(
		@Query('limit', ParseIntPipe) limit: number,
		@Query('page', ParseIntPipe) page: number,
		@Req() req
	) {
		return this.cookbookService.getAll(limit, page, req.query);
	}

	@Post()
	@Statuses('active')
	async create(@Req() req, @Body() createCookbookDto: CreateCookbookDto) {
		return this.cookbookService.create({
			creatorId: req.user.id,
			...createCookbookDto,
		});
	}

	@Put(':id')
	@Statuses('active')
	async updateById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCookbookDto: UpdateCookbookDto,
	) {
		return this.cookbookService.updateById(id, updateCookbookDto);
	}

	@Delete(':id')
	@Statuses('active')
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		return this.cookbookService.deleteById(id);
	}

	@Patch(':id/linkRecipe/:recipeId')
	@Statuses('active')
	async linkRecipe(
		@Param('id', ParseIntPipe) cookbookId: number,
		@Param('recipeId', ParseIntPipe) recipeId: number,
	) {
		return this.cookbookService.linkRecipe(cookbookId, recipeId);
	}

	@Patch(':id/unlinkRecipe/:recipeId')
	@Statuses('active')
	async unlinkRecipe(
		@Param('id', ParseIntPipe) cookbookId: number,
		@Param('recipeId', ParseIntPipe) recipeId: number,
	) {
		return this.cookbookService.unlinkRecipe(cookbookId, recipeId);
	}

	@Patch(':id')
	@Statuses('active')
	async cloneCookbook(@Param('id', ParseIntPipe) id: number, @Req() req) {
		return this.cookbookService.cloneCookbook(id, req.user.id);
	}
	
	@Get(':id/recipes')
	@NoAuth()
	async getRecipes(@Param('id', ParseIntPipe) id: number, @Req() req) {
		return this.cookbookService.getRecipes(id);
	}

	@Get(':id/card')
	@NoAuth()
	async getCardById(@Param('id', ParseIntPipe) id: number) {
		return this.cookbookService.getCardById(id);
	}

	@Post(':id/uploadAvatar')
	@Statuses('active')
	@UseInterceptors(FileInterceptor('file'))
	async uploadAvatar(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() file: Express.Multer.File,
		@Req() req,
	) {
		return this.cookbookService.uploadAvatar(id, file, req.user.id);
	}

	@Get(':id/avatar')
	@NoAuth()
	async getAvatar(
		@Param('id', ParseIntPipe) id: number,
	): Promise<StreamableFile> {
		return this.cookbookService.getAvatar(id);
	}

	@Get('stats/count')
	@Roles('Admin')
	@Statuses('active')
	async countAll() {
		return this.cookbookService.countAll();
	}

	@Get('stats/:id/views')
	@NoAuth()
	async getViews(@Param('id') id: number) {
		return this.cookbookService.getViews(id);
	}

	@Get('stats/:id/likes')
	@NoAuth()
	async getLikes(@Param('id') id: number) {
		return this.cookbookService.getLikes(id);
	}

	@Get('stats/:id/comments')
	@NoAuth()
	async getCommentsCount(@Param('id') id: number) {
		return this.cookbookService.getCommentsCount(id);
	}

	@Get('stats/mostPopular')
	@Roles('Admin')
	@Statuses('active')
	async mostPopular() {
		return this.cookbookService.mostPopular();
	}
}
