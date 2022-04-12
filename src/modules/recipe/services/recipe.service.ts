import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RecipeRepository } from "../repositories/recipe.repository"; 

@Injectable()
export class RecipeService {
	constructor(private readonly recipeRepository: RecipeRepository) {}

	async getById(id: number) {
		const recipe = await this.recipeRepository.getById(id);
		
		if(!recipe)
			throw new NotFoundException('No such recipe');

		return recipe;
  	}

	async getAll(limit: number, page: number) {
		const recipes = await this.recipeRepository.getAll(limit, (page - 1)*limit);

		return { body : recipes.rows, 
			count : recipes.count,
			pages : Math.ceil(recipes.count / limit),
			page :  page
		};
	}

	async create(recipeData: any) {
		
		const created = await this.recipeRepository.create(recipeData);
		return created;
	}

	async updateById(id: number, recipeData: any) {
		const updated = await this.recipeRepository.updateById(id, recipeData);

		if(!updated)
			throw new NotFoundException('no such recipe');

		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.recipeRepository.deleteById(id);
		
		if(!deleted)
			throw new NotFoundException('Cannot delete recipe');

		return deleted;
	}

	async countAll() {
		return await this.recipeRepository.countAll();
	}

	async getViews(id: number) {
		const recipe = await this.recipeRepository.getById(id);

		if(!recipe) {
			throw new BadRequestException('No such recipe');
		}
		return await this.recipeRepository.getViews(id);
	}

	async mostPopular() {
		return await this.recipeRepository.mostPopular();
	}

}
