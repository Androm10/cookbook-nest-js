import { Injectable } from "@nestjs/common";
import { models } from "src/services/database/sequelize";
import { Recipe } from "../entities/recipe.entity";


@Injectable()
export class RecipeRepository {

	async getById(id: number): Promise<Recipe> {		
        const found = await models.recipe.findByPk(id);
        
        if(!found)
            return null;

        return new Recipe(found);
  	}

    async getAll(limit: number, offset: number): Promise<{rows: Recipe[], count: number}> {
        
        const found = await models.recipe.findAndCountAll({ limit, offset });
        
        return {
            rows: found.rows.map(recipe => {
                return new Recipe(recipe);
            }),
            count: found.count
        };
  	}

    async create(recipeData: any): Promise<Recipe> {
        
        const recipe = await models.recipe.create(recipeData);
        return new Recipe(recipe);
    }

    async updateById(id: number, recipeData: any): Promise<Recipe> {
        
        const recipe = await models.recipe.findByPk(id);

        if(!recipe)
            return null;

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
