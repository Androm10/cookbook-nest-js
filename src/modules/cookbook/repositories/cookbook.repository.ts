import { Injectable } from "@nestjs/common";
import { models } from "src/services/database/sequelize";
import { Cookbook } from "../entities/cookbook.entity";


@Injectable()
export class CookbookRepository {

	async getById(id: number): Promise<Cookbook> {		

        const found = await models.cookbook.findByPk(id);

        if(!found)
            return null;

        return new Cookbook(found);
  	}

    async getAll(limit: number, offset: number): Promise<{rows: Cookbook[], count: number}> {

        const found = await models.cookbook.findAndCountAll({limit, offset});
        return {
            rows: found.rows.map(cookbook => {
                return new Cookbook(cookbook);
            }),
            count: found.count
        };
  	}

    async create(cookbookData: any): Promise<Cookbook> {
        
        const cookbook = await models.cookbook.create(cookbookData);
        return new Cookbook(cookbook);
    }

    async updateById(id: number, cookbookData: any): Promise<Cookbook> {
        
        const cookbook = await models.cookbook.findByPk(id);

        if(!cookbook)
            return null;

        await cookbook.update(cookbookData);

        return new Cookbook(cookbook);
    } 

    async deleteById(id: number): Promise<boolean> {

        const cookbook = await models.cookbook.findByPk(id);
        try {
            await cookbook.destroy();
        }
        catch(e) {
            return false;
        }
        return true;
    }
      
    async linkRecipe(cookbookId: number, recipeId: number): Promise<boolean> {
        
        const recipe = await models.recipe.findByPk(recipeId);
        
        if(!recipe)
            return null;

        try {
            await models.cookbooksRecipes.findOrCreate({ where: {recipeId, cookbookId}});
            return true;
        }
        catch(error) {
            return false;
        }
        
    }

    async unlinkRecipe(cookbookId: number, recipeId: number): Promise<boolean> {
        
        const recipe = await models.recipe.findByPk(recipeId);
        
        if(!recipe)
            return null;

        const link = await models.cookbooksRecipes.findOne({ where: { cookbookId, recipeId } });
        
        if(!link) {
            return false;
        }

        try {
            await link.destroy();
            return true;
        }
        catch(error) {
            return false;
        }

    }

    async cloneCookbook(id: number, userId: number): Promise<Cookbook> {
        
        const cookbook: any = await models.cookbook.findByPk(id);       
        const recipes: any[] = await cookbook.getRecipes();

        const clonedCookbook: any = await models.cookbook.create({
            name: cookbook.name,
            description: cookbook.description,
            creatorId: userId
        });

        let createdRecipes: any[] = recipes.map((recipe) => {
            return {
                name: recipe.name,
                description: recipe.description,
                directions: recipe.directions,
                ingridients: recipe.ingridients,
                cookingTime: recipe.cookingTime,
                avatar: recipe.avatar,
                creatorId: userId
            };
        });

        createdRecipes = await models.recipe.bulkCreate(createdRecipes);

        await clonedCookbook.addRecipes(createdRecipes);

        return new Cookbook(clonedCookbook);
    }

}
