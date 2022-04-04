import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const recipeComment = sequelize.define(
    'recipeComment',
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
        text : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        rate : {
            type : DataTypes.SMALLINT,
            allowNull : false
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : true,
            field : 'created_at'
        }
    },    
    {
        tableName : 'r_comments',
        timestamps: false
    }
);
