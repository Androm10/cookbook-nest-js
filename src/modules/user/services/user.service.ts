import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository"; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	async getById(id: number) {
		const user = await this.userRepo.getById(id);
		
		if(!user)
			throw new NotFoundException('No such user');

		return user;
  	}

	async getAll(limit: number, page: number) {
		
		const users = await this.userRepo.getAll(limit, (page - 1)*limit);

		return { body : users.rows, 
			count : users.count,
			pages : Math.ceil(users.count / limit),
			page :  page
		};
	}

	async create(userData: any) {
		const created = await this.userRepo.create(userData);
		return created;
	}

	async updateById(id: number, userData: any) {
		const updated = await this.userRepo.updateById(id, userData);

		if(!updated)
			throw new NotFoundException('No such user');

		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.userRepo.deleteById(id);
		
		if(!deleted)
			throw new NotFoundException('Cannot delete user');

		return deleted;
	}

	async getByLogin(login: string) {
		const user = await this.userRepo.getByLogin(login);
		return user;
	}

	async registerUser(userData: any) {
		const user = await this.userRepo.registerUser(userData);

		return user;
	} 

	async updateProfile(userId: number, userInfo: any) {

		if(!await this.userRepo.getById(userId))
			throw new NotFoundException('No such user');

		const updated = await this.userRepo.updateProfile(userId, userInfo);
		return updated;
	}

	async getRoles(userId: number): Promise<any[]> {

		if(!await this.userRepo.getById(userId))
			throw new NotFoundException('No such user');

		return await this.userRepo.getRoles(userId);
	}

	async changePassword(passwords: any, userId: number) {
		
		const user: any = await this.userRepo.getById(userId);

		if(!bcrypt.compareSync(passwords.oldPassword, user.password)) {
			throw new BadRequestException('Incorrect password');
		}

		if(passwords.newPassword !== passwords.newPasswordConfirm) {
			throw new BadRequestException('Password does not matches');
		}
		
		return await this.userRepo.updateById(userId, { password: passwords.newPassword });
	}

}
