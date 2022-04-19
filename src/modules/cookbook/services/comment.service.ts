import {
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { COMMENT_REPOSITORY } from 'src/constants/repositories';
import { ICommentRepository } from '../../../interfaces/repositories/ICommentRepository';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
	constructor(
		@Inject(COMMENT_REPOSITORY)
		private commentRepository: ICommentRepository<Comment>,
	) {}

	async getById(id: number) {
		const comment = await this.commentRepository.getById(id);

		if (!comment) throw new NotFoundException('no such comment');

		return comment;
	}

	async getAll(cookbookId: number) {
		return await this.commentRepository.getAll(cookbookId);
	}

	async create(cookbookData: any) {
		return await this.commentRepository.create(cookbookData);
	}

	async updateById(id: number, userId: number, cookbookData: any) {
		const comment = await this.commentRepository.getById(id);

		if (!comment) throw new NotFoundException('no such comment');

		if (comment.userId != userId)
			throw new ForbiddenException('сannot update foreign comment');

		return await this.commentRepository.updateById(id, cookbookData);
	}

	async deleteById(id: number, userId: number) {
		const comment = await this.commentRepository.getById(id);

		if (!comment) throw new NotFoundException('no such comment');

		if (comment.userId != userId)
			throw new ForbiddenException('сannot delete foreign comment');

		return await this.commentRepository.deleteById(id);
	}
}
