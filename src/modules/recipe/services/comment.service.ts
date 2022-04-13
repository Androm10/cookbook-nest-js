import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { COMMENT_REPOSITORY } from "src/constants/repositories";
import { Comment } from "../entities/comment.entity";
import { ICommentRepository } from "../../../interfaces/repositories/ICommentRepository"; 

@Injectable()
export class CommentService {
	constructor(@Inject(COMMENT_REPOSITORY) private commentRepository: ICommentRepository<Comment>) {}

	async getById(id: number) {
        const comment = await this.commentRepository.getById(id);
    
        if(!comment)
            throw new NotFoundException('no such comment');

        return comment;
    }

	async getAll(recipeId: number) {
        return await this.commentRepository.getAll(recipeId);
    }

	async create(recipeData: any) {
        return await this.commentRepository.create(recipeData);
	}

	async updateById(id: number, userId: number, recipeData: any) {
        
        const comment = await this.commentRepository.getById(id);

        if(!comment)
            throw new NotFoundException('no such comment');

        if(comment.userId != userId)
            throw new ForbiddenException('forbidden');

        return await this.commentRepository.updateById(id, recipeData);
	}

	async deleteById(id: number, userId: number) {

        const comment = await this.commentRepository.getById(id);

        if(!comment)
            throw new NotFoundException('no such comment');

        if(comment.userId != userId)
            throw new ForbiddenException('forbidden');
        
        return await this.commentRepository.deleteById(id);
	}

}
