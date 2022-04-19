import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const role = sequelize.define(
	'role',
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			allowNull: false,
			unique: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.CHAR(50),
			unique: true,
			allowNull: false,
		},
	},
	{
		tableName: 'roles',
		timestamps: false,
	},
);
