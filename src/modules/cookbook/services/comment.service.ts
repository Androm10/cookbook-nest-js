import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../repositories/comment.repository"; 

@Injectable()
export class CommentService {
	constructor(private readonly commentRepository: CommentRepository) {}

	async getById(id: number) {
        const comment = await this.commentRepository.getById(id);
    
        if(!comment)
            throw new Error('no such comment');

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

        if(!comment)
            throw new Error('no such comment');

        if(comment.userId != userId)
            throw new Error('forbidden');

        return await this.commentRepository.updateById(id, cookbookData);
	}

	async deleteById(id: number, userId: number) {

        const comment = await this.commentRepository.getById(id);

        if(!comment)
            throw new Error('no such comment');

        if(comment.userId != userId)
            throw new Error('forbidden');
        
        return await this.commentRepository.deleteById(id);
	}

}
