import { Injectable } from "@nestjs/common";
import { IRecipeRepository } from "src/interfaces/repositories/IRecipeRepository";
import { models } from "src/services/database/sequelize";
import { Recipe } from "../entities/recipe.entity";


@Injectable()
export class RecipeRepository implements IRecipeRepository<Recipe> {

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
    
    async countAll() {
        const fn = models.recipe.sequelize.fn;
        const col = models.recipe.sequelize.col;

        const count = await models.recipe.findAll({
            attributes : [[fn('COUNT', col('id')), 'recipes']]
        })
        return count[0];
    }

    async getViews(id: number) {
        const fn = models.recipe.sequelize.fn;
        const col = models.recipe.sequelize.col;

        const views = await models.recipeView.findAll({
            attributes: [[fn('COUNT', col('id')), 'views'] ],
            where : {
                recipeId : id
            }
        });
        return views[0];
    }

    async mostPopular() {
        const fn = models.recipe.sequelize.fn;
        const col = models.recipe.sequelize.col;
        const literal = models.recipe.sequelize.literal;

        const recipe = await models.recipe.findAll({
            include : {
                model : models.recipeView,
                attributes: [[fn('COUNT', col('recipeViews.id')), 'count']],
                required : true
            },
            group: 'recipe.id',
            order: literal('"recipeViews.count" DESC'),
            limit: 1
        })
        
        return recipe[0];
    }

}
