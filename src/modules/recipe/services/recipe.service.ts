import {
	BadRequestException,
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
	StreamableFile,
} from '@nestjs/common';
import { RECIPE_REPOSITORY } from 'src/constants/repositories';
import { Recipe } from '../entities/recipe.entity';
import { IRecipeRepository } from '../../../interfaces/repositories/IRecipeRepository';
import { createReadStream } from 'fs';

@Injectable()
export class RecipeService {
	constructor(
		@Inject(RECIPE_REPOSITORY)
		private recipeRepository: IRecipeRepository<Recipe>,
	) {}

	async getById(id: number) {
		const recipe = await this.recipeRepository.getById(id);

		if (!recipe) throw new NotFoundException('No such recipe');

		return recipe;
	}

	async getAll(limit: number, page: number, query: any) {
		const recipes = await this.recipeRepository.getAll(
			limit,
			(page - 1) * limit,
			query
		);

		return {
			body: recipes.rows,
			count: recipes.count,
			pages: Math.ceil(recipes.count / limit),
			page: page,
		};
	}

	async create(recipeData: any) {
		const created = await this.recipeRepository.create(recipeData);
		return created;
	}

	async updateById(id: number, recipeData: any) {
		const updated = await this.recipeRepository.updateById(id, recipeData);

		if (!updated) throw new NotFoundException('no such recipe');

		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.recipeRepository.deleteById(id);

		if (!deleted) throw new NotFoundException('Cannot delete recipe');

		return deleted;
	}

	async cloneRecipe(id: number, userId: number) {
		const recipe = await this.recipeRepository.getById(id);

		if (!recipe) {
			throw new BadRequestException('No such recipe');
		}
		
        let cloned = {
            name : recipe.name,
            description : recipe.description,
            directions : recipe.directions,
            ingridients : recipe.ingridients,
            cookingTime : recipe.cookingTime,
			avatar: recipe.avatar,
            creatorId : userId
        }

        let result = await this.recipeRepository.create(cloned);

        return result;

	}

	async uploadAvatar(id: number, file: Express.Multer.File, userId: number) {
		const recipe = await this.recipeRepository.getById(id);
		if (!recipe) {
			throw new NotFoundException('No such recipe');
		}
		if (recipe.creatorId != userId) {
			throw new ForbiddenException('Cannot update foreign objects');
		}
		return await this.recipeRepository.updateById(id, {
			avatar: file.path,
		});
	}

	async getAvatar(id: number): Promise<StreamableFile> {
		const recipe = await this.recipeRepository.getById(id);
		if (!recipe) {
			throw new NotFoundException('No such recipe');
		}
		if (!recipe.avatar) {
			throw new BadRequestException('Nothing to download');
		}
		const fileStream = createReadStream(recipe.avatar);
		return new StreamableFile(fileStream);
	}

	async countAll() {
		return await this.recipeRepository.countAll();
	}

	async getViews(id: number) {
		const recipe = await this.recipeRepository.getById(id);

		if (!recipe) {
			throw new BadRequestException('No such recipe');
		}
		return await this.recipeRepository.getViews(id);
	}

	async getLikes(id: number) {
		const recipe = await this.recipeRepository.getById(id);

		if (!recipe) {
			throw new BadRequestException('No such recipe');
		}
		return await this.recipeRepository.getLikes(id);
	}

	async getCommentsCount(id: number) {
		const recipe = await this.recipeRepository.getById(id);

		if (!recipe) {
			throw new BadRequestException('No such recipe');
		}
		return await this.recipeRepository.getCommentsCount(id);
	}


	async mostPopular() {
		return await this.recipeRepository.mostPopular();
	}
}
