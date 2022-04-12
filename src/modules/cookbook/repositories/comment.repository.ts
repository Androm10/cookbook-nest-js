import { Injectable } from "@nestjs/common";
import { ICommentRepository } from "src/interfaces/repositories/ICommentRepository";
import { models } from "src/services/database/sequelize";
import { Comment } from "../entities/comment.entity";


@Injectable()
export class CommentRepository implements ICommentRepository<Comment> {

	async getById(id: number): Promise<Comment> {		
        const comment = await models.cookbookComment.findByPk(id);

        if(!comment)
            return null;
        
        return new Comment(comment);
    }

    async getAll(cookbookId: number): Promise<Comment[]> {
        const comments = await models.cookbookComment.findAll({ where : { cookbookId } });
        return comments.map(comment => {
            return new Comment(comment);
        });
    }

    async create(commentData: any): Promise<Comment> {
        const comment = await models.cookbookComment.create(commentData);
        return new Comment(comment);
    }

    async updateById(id: number, commentData: any): Promise<Comment> {
        const comment = await models.cookbookComment.findByPk(id);

        if(!comment)
            return null;

        await comment.update(commentData);

        return new Comment(comment);
    } 

    async deleteById(id: number): Promise<boolean> {

        const comment = await models.cookbookComment.findByPk(id);
        try {
            await comment.destroy();
        }
        catch(e) {
            return false;
        }
        return true;
    
    }
      

}
