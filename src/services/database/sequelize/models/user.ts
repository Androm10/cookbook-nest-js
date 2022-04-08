import {  DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';
import * as bcrypt from 'bcrypt';

export const user = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false
        }      
    },
    {
        tableName : 'users',
        timestamps: false
    }
);

async function hashPassword(user: any, options: any) {
    if(user.password.length <= 30) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    } 
}

user.addHook('beforeCreate', 'hashPassword', hashPassword);

user.addHook('beforeUpdate', 'hashPassword', hashPassword);



