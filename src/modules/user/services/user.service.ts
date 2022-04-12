import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository"; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getById(id: number) {
		const user = await this.userRepository.getById(id);
		
		if(!user)
			throw new NotFoundException('No such user');

		return user;
  	}

	async getAll(limit: number, page: number) {
		
		const users = await this.userRepository.getAll(limit, (page - 1)*limit);

		return { body : users.rows, 
			count : users.count,
			pages : Math.ceil(users.count / limit),
			page :  page
		};
	}

	async create(userData: any) {
		const created = await this.userRepository.create(userData);
		return created;
	}

	async updateById(id: number, userData: any) {
		const updated = await this.userRepository.updateById(id, userData);

		if(!updated)
			throw new NotFoundException('No such user');

		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.userRepository.deleteById(id);
		
		if(!deleted)
			throw new NotFoundException('Cannot delete user');

		return deleted;
	}

	async getByLogin(login: string) {
		const user = await this.userRepository.getByLogin(login);
		return user;
	}

	async registerUser(userData: any) {
		const user = await this.userRepository.registerUser(userData);

		return user;
	} 

	async updateProfile(userId: number, userInfo: any) {

		if(!await this.userRepository.getById(userId))
			throw new NotFoundException('No such user');

		const updated = await this.userRepository.updateProfile(userId, userInfo);
		return updated;
	}

	async getRoles(userId: number): Promise<any[]> {

		if(!await this.userRepository.getById(userId))
			throw new NotFoundException('No such user');

		return await this.userRepository.getRoles(userId);
	}

	async changePassword(passwords: any, userId: number) {
		
		const user: any = await this.userRepository.getById(userId);

		if(!bcrypt.compareSync(passwords.oldPassword, user.password)) {
			throw new BadRequestException('Incorrect password');
		}

		if(passwords.newPassword !== passwords.newPasswordConfirm) {
			throw new BadRequestException('Password does not matches');
		}
		
		return await this.userRepository.updateById(userId, { password: passwords.newPassword });
	}

	async getStatusStats() {
		return await this.userRepository.getStatusStats();
	}

	async mostActive() {
		return await this.userRepository.mostActive();
	}

}
