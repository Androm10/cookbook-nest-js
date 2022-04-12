import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/interfaces/repositories/IUserRepository";
import { models } from "src/services/database/sequelize";
import { User } from "../entities/user.entity";


@Injectable()
export class UserRepository implements IUserRepository<User> {

	async getById(id: number): Promise<User> {		

        const found = await models.user.findByPk(id);

        if(!found)
            return null;

        return new User(found);
  	}

    async getAll(limit: number, offset: number): Promise<{rows: User[], count: number}> {

        const found = await models.user.findAndCountAll({ limit, offset});
        return {
            rows: found.rows.map(user => {
                return new User(user);
            }),
            count: found.count
        };
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

    async getStatusStats() {
        const fn = models.user.sequelize.fn;

        return await models.user.findAll({
            attributes : ['status', [fn('COUNT', '*'), 'users']],
            group: 'status'
        });
    }

    async mostActive() {
        return await models.user.sequelize.query(
            'SELECT u.id, COUNT(cr.id) + COUNT(cc.id) as "comments", '+ 
            'COUNT(lr.id) + COUNT(lc.id) as "likes" FROM users u ' +
            'LEFT JOIN c_comments cc ON u.id = cc.user_id ' +
            'LEFT JOIN r_comments cr ON u.id = cr.user_id ' +
            'LEFT JOIN c_likes lc ON u.id = lc.user_id ' +
            'LEFT JOIN r_likes lr ON u.id = lr.user_id ' +
            'GROUP BY u.id ' +
            'ORDER BY comments + likes DESC',
            {
                type : "SELECT"
            });
    }

}
