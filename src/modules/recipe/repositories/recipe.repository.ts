import { Injectable } from "@nestjs/common";
import { BasicRepository } from "src/interfaces/Repository";
import { models } from "src/services/database/sequelize";
import { Recipe } from "../entities/recipe.entity";


@Injectable()
export class RecipeRepository implements BasicRepository<Recipe> {

	async getById(id: number): Promise<Recipe> {		
        const found = await models.recipe.findByPk(id);

        if(!found)
            throw new Error('No such recipe');

        return new Recipe(found);
  	}

    async getAll(): Promise<Recipe[]> {

        const found = await models.recipe.findAll();
        return found.map(recipe => {
            return new Recipe(recipe);
        })
  	}

    async create(recipeData: any): Promise<Recipe> {
        
        const recipe = await models.recipe.create(recipeData);
        return new Recipe(recipe);
    }

    async updateById(id: number, recipeData: any): Promise<Recipe> {
        
        const recipe = await models.recipe.findByPk(id);
        await recipe.update(recipeData);

        return new Recipe(recipe);
    } 

    async deleteById(id: number): Promise<boolean> {

        const recipe = await models.recipe.findByPk(id);
        try {
            await recipe.destroy();
        }
        catch(e) {
            return false;
        }
        return true;
    }
      

}
