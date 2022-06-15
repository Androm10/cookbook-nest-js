import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LIKE_REPOSITORY } from 'src/constants/repositories';
import { ILikeRepository } from '../../../interfaces/repositories/ILikeRepository';

@Injectable()
export class LikeService {
	constructor(
		@Inject(LIKE_REPOSITORY) private likeRepository: ILikeRepository,
	) {}

	async isLiked(id: number, userId: number) {
		return this.likeRepository.isLiked(id, userId);
	}
	
	async like(id: number, userId: number) {
		const created = await this.likeRepository.like(id, userId);

		if (!created)
			throw new BadRequestException('Already have like on this recipe');

		return created;
	}

	async unlike(id: number, userId: number) {
		const deleted = await this.likeRepository.unlike(id, userId);

		if (!deleted)
			throw new BadRequestException('This recipe does not have like');

		return deleted;
	}
}
