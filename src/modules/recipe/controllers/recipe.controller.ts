import {
	Controller,
	Param,
	Get,
	Post,
	Body,
	Put,
	Delete,
	Req,
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
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { RecipeService } from '../services/recipe.service';

@Controller('recipe')
export class RecipeController {
	constructor(private readonly recipeService: RecipeService) {}

	@Get(':id')
	@NoAuth()
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.recipeService.getById(id);
	}

	@Get()
	@NoAuth()
	async getAll(
		@Query('limit', ParseIntPipe) limit: number,
		@Query('page', ParseIntPipe) page: number,
		@Req() req
	) {
		return this.recipeService.getAll(limit, page, req.query);
	}

	@Post()
	@Statuses('active')
	async create(@Req() req, @Body() createRecipeDto: CreateRecipeDto) {
		return this.recipeService.create({
			creatorId: req.user.id,
			...createRecipeDto,
		});
	}

	@Put(':id')
	@Statuses('active')
	async updateById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateRecipeDto: UpdateRecipeDto,
	) {
		return this.recipeService.updateById(id, updateRecipeDto);
	}

	@Delete(':id')
	@Statuses('active')
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		return this.recipeService.deleteById(id);
	}

	@Post(':id/uploadAvatar')
	@UseInterceptors(FileInterceptor('file'))
	@Statuses('active')
	async uploadAvatar(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() file: Express.Multer.File,
		@Req() req,
	) {
		return this.recipeService.uploadAvatar(id, file, req.user.id);
	}

	@Get(':id/avatar')
	@NoAuth()
	@Statuses('active')
	async getAvatar(
		@Param('id', ParseIntPipe) id: number,
	): Promise<StreamableFile> {
		return this.recipeService.getAvatar(id);
	}

	@Get('stats/count')
	@Roles('Admin')
	@Statuses('active')
	async countAll() {
		return this.recipeService.countAll();
	}

	@Get('stats/:id/views')
	@NoAuth()
	async getViews(@Param('id') id: number) {
		return this.recipeService.getViews(id);
	}

	@Get('stats/:id/likes')
	@NoAuth()
	async getLikes(@Param('id') id: number) {
		return this.recipeService.getLikes(id);
	}

	@Get('stats/:id/comments')
	@NoAuth()
	async getCommentsCount(@Param('id') id: number) {
		return this.recipeService.getCommentsCount(id);
	}

	@Get('stats/mostPopular')
	@Roles('Admin')
	@Statuses('active')
	async mostPopular() {
		return this.recipeService.mostPopular();
	}
}
