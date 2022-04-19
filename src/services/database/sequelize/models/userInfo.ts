import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const userInfo = sequelize.define(
	'userInfo',
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			allowNull: false,
			unique: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			unique: true,
			field: 'user_id',
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		avatar: {
			type: DataTypes.STRING(255),
		},
		info: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: 'user_info',
		timestamps: false,
	},
);
