import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const recipeLike = sequelize.define(
    'recipeLike',
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
        tableName : 'r_likes',
        timestamps: false
    }
);
