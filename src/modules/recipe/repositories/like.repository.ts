import { Injectable } from "@nestjs/common";
import { models } from "src/services/database/sequelize";


@Injectable()
export class LikeRepository {

	async like(id: number, userId: number): Promise<boolean> {
        
        const existed = await models.recipeLike.findOne({
            where: {
                userId : userId,
                recipeId : id
            }
        });

        if(existed)
            return false;

        models.recipeLike.create({
            userId : userId,
            recipeId : id
        });

        return true;
  	}

    async unlike(id: number, userId: number): Promise<boolean> {
        
        const existed = await models.recipeLike.findOne({
            where: {
                userId : userId,
                recipeId : id
            }
        });

        if(!existed)
            return false;

        await existed.destroy();

        return true;
    }
      

}
