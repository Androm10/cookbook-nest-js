import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const cookbooksRecipes = sequelize.define(
	'cookbooksRecipes',
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			allowNull: false,
			unique: true,
			autoIncrement: true,
		},
		cookbookId: {
			type: DataTypes.BIGINT.UNSIGNED,
			field: 'cookbook_id',
		},
		recipeId: {
			type: DataTypes.BIGINT.UNSIGNED,
			field: 'recipe_id',
		},
	},
	{
		tableName: 'cookbooks_recipes',
		timestamps: false,
	},
);
