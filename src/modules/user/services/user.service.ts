import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository"; 
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	async getById(id: number) {
		const user = await this.userRepo.getById(id);
		
		if(!user)
			throw new Error('No such user');

		return user;
  	}

	async getAll() {
		const users = await this.userRepo.getAll();
		return users;
	}

	async create(userData: any) {
		
		const salt = bcrypt.genSaltSync(10);
		userData.password = bcrypt.hashSync(userData.password, salt);

		const created = await this.userRepo.create(userData);
		return created;
	}

	async updateById(id: number, userData: any) {
		const updated = await this.userRepo.updateById(id, userData);
		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.userRepo.deleteById(id);
		
		if(!deleted)
			throw new Error('Cannot delete user');

		return deleted;
	}

}
