import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const usersRoles = sequelize.define(
    'usersRoles',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'user_id'
        },
        roleId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'role_id'
        },      
    },
    {
        tableName : 'users_roles',
        timestamps: false
    }
);
