import { Injectable } from '@nestjs/common';
import { ICookbookRepository } from 'src/interfaces/repositories/ICookbookRepository';
import { models } from 'src/services/database/sequelize';
import { Cookbook } from '../entities/cookbook.entity';

@Injectable()
export class CookbookRepository implements ICookbookRepository<Cookbook> {
	async getById(id: number): Promise<Cookbook> {
		const found = await models.cookbook.findByPk(id);

		if (!found) return null;

		return new Cookbook(found);
	}

	async getAll(
		limit: number,
		offset: number,
	): Promise<{ rows: Cookbook[]; count: number }> {
		const found = await models.cookbook.findAndCountAll({ limit, offset });
		return {
			rows: found.rows.map((cookbook) => {
				return new Cookbook(cookbook);
			}),
			count: found.count,
		};
	}

	async create(cookbookData: any): Promise<Cookbook> {
		const cookbook = await models.cookbook.create(cookbookData);
		return new Cookbook(cookbook);
	}

	async updateById(id: number, cookbookData: any): Promise<Cookbook> {
		const cookbook = await models.cookbook.findByPk(id);

		if (!cookbook) return null;

		await cookbook.update(cookbookData);

		return new Cookbook(cookbook);
	}

	async deleteById(id: number): Promise<boolean> {
		const cookbook = await models.cookbook.findByPk(id);
		try {
			await cookbook.destroy();
		} catch (e) {
			return false;
		}
		return true;
	}

	async linkRecipe(cookbookId: number, recipeId: number): Promise<boolean> {
		const recipe = await models.recipe.findByPk(recipeId);

		if (!recipe) return null;

		try {
			await models.cookbooksRecipes.findOrCreate({
				where: { recipeId, cookbookId },
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	async unlinkRecipe(cookbookId: number, recipeId: number): Promise<boolean> {
		const recipe = await models.recipe.findByPk(recipeId);

		if (!recipe) return null;

		const link = await models.cookbooksRecipes.findOne({
			where: { cookbookId, recipeId },
		});

		if (!link) {
			return false;
		}

		try {
			await link.destroy();
			return true;
		} catch (error) {
			return false;
		}
	}

	async cloneCookbook(id: number, userId: number): Promise<Cookbook> {
		const cookbook: any = await models.cookbook.findByPk(id);
		const recipes: any[] = await cookbook.getRecipes();

		const clonedCookbook: any = await models.cookbook.create({
			name: cookbook.name,
			description: cookbook.description,
			creatorId: userId,
		});

		let createdRecipes: any[] = recipes.map((recipe) => {
			return {
				name: recipe.name,
				description: recipe.description,
				directions: recipe.directions,
				ingridients: recipe.ingridients,
				cookingTime: recipe.cookingTime,
				avatar: recipe.avatar,
				creatorId: userId,
			};
		});

		createdRecipes = await models.recipe.bulkCreate(createdRecipes);

		await clonedCookbook.addRecipes(createdRecipes);

		return new Cookbook(clonedCookbook);
	}

	async getRecipes(id: number) {
		const cookbook: any = await models.cookbook.findByPk(id);
		const recipes: any[] = await cookbook.getRecipes();

		return recipes;
	}

	async countAll() {
		const fn = models.cookbook.sequelize.fn;
		const col = models.cookbook.sequelize.col;

		const count = await models.cookbook.findAll({
			attributes: [[fn('COUNT', col('id')), 'cookbooks']],
		});
		return count[0];
	}

	async getViews(id: number) {
		const fn = models.cookbook.sequelize.fn;
		const col = models.cookbook.sequelize.col;

		const views = await models.cookbookView.findAll({
			attributes: [[fn('COUNT', col('id')), 'views']],
			where: {
				cookbookId: id,
			},
		});
		return views[0];
	}

	async getLikes(id: number) {
		const fn = models.cookbook.sequelize.fn;
		const col = models.cookbook.sequelize.col;

		const likes = await models.cookbookLike.findAll({
			attributes: [[fn('COUNT', col('id')), 'likes']],
			where: {
				cookbookId: id,
			},
		});
		return likes[0];
	}

	async getCommentsCount(id: number) {
		const fn = models.cookbook.sequelize.fn;
		const col = models.cookbook.sequelize.col;

		const comments = await models.cookbookComment.findAll({
			attributes: [[fn('COUNT', col('id')), 'comments']],
			where: {
				cookbookId: id,
			},
		});
		return comments[0];
	}

	async mostPopular() {
		const fn = models.cookbook.sequelize.fn;
		const col = models.cookbook.sequelize.col;
		const literal = models.cookbook.sequelize.literal;

		const cookbook = await models.cookbook.findAll({
			include: {
				model: models.cookbookView,
				attributes: [[fn('COUNT', col('cookbookViews.id')), 'count']],
				required: true,
			},
			group: 'cookbook.id',
			order: literal('"cookbookViews.count" DESC'),
			limit: 1,
		});

		return cookbook[0];
	}
}
