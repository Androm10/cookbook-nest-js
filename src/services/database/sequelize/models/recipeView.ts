import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const recipeView = sequelize.define(
    'recipeView',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        userId : {
            type : DataTypes.BIGINT.UNSIGNED,
            allowNull : false,
            field: 'user_id'
        },
        recipeId : {
            type : DataTypes.BIGINT.UNSIGNED,
            allowNull : false,
            field : 'recipe_id'
        },
    },    
    {
        tableName : 'r_views',
        timestamps: false
    }
);
