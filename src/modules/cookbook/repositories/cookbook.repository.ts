import { Injectable } from "@nestjs/common";
import { models } from "src/services/database/sequelize";
import { Cookbook } from "../entities/cookbook.entity";


@Injectable()
export class CookbookRepository {

	async getById(id: number): Promise<Cookbook> {		

        const found = await models.cookbook.findByPk(id);

        if(!found)
            return null;

        return new Cookbook(found);
  	}

    async getAll(): Promise<Cookbook[]> {

        const found = await models.cookbook.findAll();
        return found.map(cookbook => {
            return new Cookbook(cookbook);
        })
  	}

    async create(cookbookData: any): Promise<Cookbook> {
        
        const cookbook = await models.cookbook.create(cookbookData);
        return new Cookbook(cookbook);
    }

    async updateById(id: number, cookbookData: any): Promise<Cookbook> {
        
        const cookbook = await models.cookbook.findByPk(id);

        if(!cookbook)
            return null;

        await cookbook.update(cookbookData);

        return new Cookbook(cookbook);
    } 

    async deleteById(id: number): Promise<boolean> {

        const cookbook = await models.cookbook.findByPk(id);
        try {
            await cookbook.destroy();
        }
        catch(e) {
            return false;
        }
        return true;
    }
      

}
