import { Injectable } from '@nestjs/common';
import { ILikeRepository } from 'src/interfaces/repositories/ILikeRepository';
import { models } from 'src/services/database/sequelize';

@Injectable()
export class LikeRepository implements ILikeRepository {


	async isLiked(id: number, userId: number) {
		const existed = await models.cookbookLike.findOne({
			where: {
				userId: userId,
				cookbookId: id,
			},
		});

		if (existed) return true;
		return false;
	}

	async like(id: number, userId: number): Promise<boolean> {
		const existed = await models.cookbookLike.findOne({
			where: {
				userId: userId,
				cookbookId: id,
			},
		});

		if (existed) return false;

		models.cookbookLike.create({
			userId: userId,
			cookbookId: id,
		});

		return true;
	}

	async unlike(id: number, userId: number): Promise<boolean> {
		const existed = await models.cookbookLike.findOne({
			where: {
				userId: userId,
				cookbookId: id,
			},
		});

		if (!existed) return false;

		await existed.destroy();

		return true;
	}
}
