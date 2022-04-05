import { Injectable } from "@nestjs/common";
import { models } from "src/services/database/sequelize";
import { User } from "../entities/user.entity";


@Injectable()
export class UserRepository {

	async getById(id: number): Promise<User> {		

        const found = await models.user.findByPk(id);

        if(!found)
            throw new Error('No such user');

        return new User(found);
  	}

    async getAll(): Promise<User[]> {

        const found = await models.user.findAll();
        return found.map(user => {
            return new User(user);
        })
  	}

    async create(userData: any): Promise<User> {
        
        const user = await models.user.create(userData);
        return new User(user);
    }

    async updateById(id: number, userData: any): Promise<User> {
        
        const user = await models.user.findByPk(id);
        await user.update(userData);

        return new User(user);
    } 

    async deleteById(id: number): Promise<boolean> {

        const user = await models.user.findByPk(id);
        try {
            await user.destroy();
        }
        catch(e) {
            return false;
        }
        return true;
    }
      

}
