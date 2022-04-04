import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const cookbookComment = sequelize.define(
    'cookbookComment',
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
        tableName : 'c_comments',
        timestamps: false
    }
);
