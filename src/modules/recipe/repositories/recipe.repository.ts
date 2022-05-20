import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IRecipeRepository } from 'src/interfaces/repositories/IRecipeRepository';
import { models } from 'src/services/database/sequelize';
import { Recipe } from '../entities/recipe.entity';

@Injectable()
export class RecipeRepository implements IRecipeRepository<Recipe> {
	async getById(id: number): Promise<Recipe> {
		const found = await models.recipe.findByPk(id);

		if (!found) return null;

		return new Recipe(found);
	}

	async getAll(
		limit: number,
		offset: number,
		query: any
	): Promise<{ rows: Recipe[]; count: number }> {

		const literal = models.recipe.sequelize.literal;

		const options: any = { };
		switch (query?.sort?.toLowerCase()?.trim()) {
			case 'likes' : {
				options.subQuery = false;
				options.include = {
					model: models.recipeLike,
					attributes: [],
				};
				options.order = [
					literal('COUNT(recipeLikes.id) DESC')
				];
				options.group = literal('recipe.id');
				break;
			}
			case 'popularity' : {
				options.subQuery = false;
               	options.include = {model: models.recipeView, attributes : []};
               	options.order = [
                   literal('COUNT(recipeViews.id) DESC')
               	];
				options.group = literal('recipe.id');
               	break;
			}
		}
		if(+query.upperBound && +query.lowerBound) {
			options.where.cookingTime[Op.lte] = +query.upperBound;
			options.where.cookingTime[Op.gte] = +query.lowerBound;
		}

		if(+query?.creatorId > 0) {
			if(!options.where) {
				options.where = {};
			}
			options.where.creatorId = +query?.creatorId;
		}
		
		//add hide own logic

		const found = await models.recipe.findAndCountAll({ limit, offset, ...options});
		
		return {
			rows: found.rows.map((recipe) => {
				return new Recipe(recipe);
			}),
			count: found.count,
		};
	}

	async create(recipeData: any): Promise<Recipe> {
		const recipe = await models.recipe.create(recipeData);
		return new Recipe(recipe);
	}

	async updateById(id: number, recipeData: any): Promise<Recipe> {
		const recipe = await models.recipe.findByPk(id);

		if (!recipe) return null;

		await recipe.update(recipeData);

		return new Recipe(recipe);
	}

	async deleteById(id: number): Promise<boolean> {
		const recipe = await models.recipe.findByPk(id);
		try {
			await recipe.destroy();
		} catch (e) {
			return false;
		}
		return true;
	}

	async countAll() {
		const fn = models.recipe.sequelize.fn;
		const col = models.recipe.sequelize.col;

		const count = await models.recipe.findAll({
			attributes: [[fn('COUNT', col('id')), 'recipes']],
		});
		return count[0];
	}

	async getViews(id: number) {
		const fn = models.recipe.sequelize.fn;
		const col = models.recipe.sequelize.col;

		const views = await models.recipeView.findAll({
			attributes: [[fn('COUNT', col('id')), 'views']],
			where: {
				recipeId: id,
			},
		});
		return views[0];
	}

	async getLikes(id: number) {
		const fn = models.recipe.sequelize.fn;
		const col = models.recipe.sequelize.col;

		const likes = await models.recipeLike.findAll({
			attributes: [[fn('COUNT', col('id')), 'likes']],
			where: {
				recipeId: id,
			},
		});
		return likes[0];
	}

	async getCommentsCount(id: number) {
		const fn = models.recipe.sequelize.fn;
		const col = models.recipe.sequelize.col;

		const comments = await models.recipeComment.findAll({
			attributes: [[fn('COUNT', col('id')), 'comments']],
			where: {
				recipeId: id,
			},
		});
		return comments[0];
	}

	async mostPopular() {
		const fn = models.recipe.sequelize.fn;
		const col = models.recipe.sequelize.col;
		const literal = models.recipe.sequelize.literal;

		const recipe = await models.recipe.findAll({
			include: {
				model: models.recipeView,
				attributes: [[fn('COUNT', col('recipeViews.id')), 'count']],
				required: true,
			},
			group: 'recipe.id',
			order: literal('"recipeViews.count" DESC'),
			limit: 1,
		});

		return recipe[0];
	}
}
