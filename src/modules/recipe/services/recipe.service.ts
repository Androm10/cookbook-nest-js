import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "../repositories/recipe.repository"; 

@Injectable()
export class RecipeService {
	constructor(private readonly recipeRepo: RecipeRepository) {}

	async getById(id: number) {
		const recipe = await this.recipeRepo.getById(id);
		
		if(!recipe)
			throw new Error('No such recipe');

		return recipe;
  	}

	async getAll() {
		const recipes = await this.recipeRepo.getAll();
		return recipes;
	}

	async create(recipeData: any) {
		
		const created = await this.recipeRepo.create(recipeData);
		return created;
	}

	async updateById(id: number, recipeData: any) {
		const updated = await this.recipeRepo.updateById(id, recipeData);

		if(!updated)
			throw new Error('no such recipe');

		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.recipeRepo.deleteById(id);
		
		if(!deleted)
			throw new Error('Cannot delete recipe');

		return deleted;
	}

}
