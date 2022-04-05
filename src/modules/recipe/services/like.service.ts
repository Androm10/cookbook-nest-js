import { Injectable } from "@nestjs/common";
import { LikeRepository } from '../repositories/like.repository';

@Injectable()
export class LikeService {
	constructor(private readonly likeRepository: LikeRepository) {}

	async like(id: number, userId: number) {

		const created = await this.likeRepository.like(id, userId);
		
		if(!created)
			throw new Error('Already have like on this recipe');

		return created;
  	}

	async unlike(id: number, userId: number) {
		const deleted = await this.likeRepository.unlike(id, userId);
		
		if(!deleted)
			throw new Error('This recipe does not have like');

		return deleted;
	}

}
