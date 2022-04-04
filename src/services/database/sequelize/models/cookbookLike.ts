import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const cookbookLike = sequelize.define(
    'cookbookLike',
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
        cookbookId : {
            type : DataTypes.BIGINT.UNSIGNED,
            allowNull : false,
            field : 'cookbook_id'
        },
    },    
    {
        tableName : 'c_likes',
        timestamps: false
    }
);
