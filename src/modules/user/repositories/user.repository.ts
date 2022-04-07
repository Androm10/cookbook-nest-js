import { Injectable } from "@nestjs/common";
import { models } from "src/services/database/sequelize";
import { User } from "../entities/user.entity";


@Injectable()
export class UserRepository {

	async getById(id: number): Promise<User> {		

        const found = await models.user.findByPk(id);

        if(!found)
            return null;

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

        if(!user)
            return null;

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

    async getByLogin(login: string): Promise<User> {
        
        const user = await models.user.findOne({ where: { login } });

        if(!user)
            return null;
        
        return new User(user);
    } 
    
    async registerUser(userData: any): Promise<User> {

        const user: any = await models.user.create({ login: userData.login, 
            password: userData.password, 
            status: userData.status
        });

        const userRole = await models.role.findOne({ where: { name: "User" } });
        
        await Promise.all([
            user.addRole(userRole),
            user.createUserInfo({username: userData.username})
        ]);

        return new User(user);
    }
      
    async updateProfile(userId: number, userInfo: any) {

        const user = await models.userInfo.findOne({ where: { userId } });
        return await user.update(userInfo);
    }

    async getRoles(userId: number) {

        const user: any = await models.user.findByPk(userId);
        return await user.getRoles();
    }

}
