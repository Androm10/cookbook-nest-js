import { BadRequestException, Inject, Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository"; 
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from "src/constants/repositories";
import { User } from "../entities/user.entity";
import { createReadStream } from "fs";

@Injectable()
export class UserService {
	constructor(@Inject(USER_REPOSITORY) private userRepository: IUserRepository<User>) {}

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

	async updateProfile(id: number, userInfo: any) {

		if(!await this.userRepository.getById(id)) {
			throw new BadRequestException('No such user');
		}

		const updated = await this.userRepository.updateProfile(id, userInfo);
		return updated;
	}

	async getProfile(id: number) {
		if(!await this.userRepository.getById(id)) {
			throw new BadRequestException('No such user');
		}
		return await this.userRepository.getProfile(id);
	}

	async uploadAvatar(file: Express.Multer.File, id: number) {
		if(!(await this.userRepository.getById(id))) {
			throw new BadRequestException('No such user');
		}
		return await this.userRepository.updateProfile(id, { avatar : file.path });
	}

	async getAvatar(id: number) : Promise<StreamableFile> {
		const user = await this.userRepository.getById(id);
		if(!user) {
			throw new BadRequestException('No such user');
		}
		const userInfo = await this.userRepository.getProfile(id);
		const fileStream = createReadStream(userInfo.avatar);
		return new StreamableFile(fileStream);
	}

	async getRoles(id: number): Promise<any[]> {

		if(!await this.userRepository.getById(id)) {
			throw new BadRequestException('No such user');
		}

		return await this.userRepository.getRoles(id);
	}

	async changePassword(passwords: any, id: number) {
		
		const user: any = await this.userRepository.getById(id);

		if(!bcrypt.compareSync(passwords.oldPassword, user.password)) {
			throw new BadRequestException('Incorrect password');
		}

		if(passwords.newPassword !== passwords.newPasswordConfirm) {
			throw new BadRequestException('Password does not matches');
		}
		
		return await this.userRepository.updateById(id, { password: passwords.newPassword });
	}

	async getStatusStats() {
		return await this.userRepository.getStatusStats();
	}

	async mostActive() {
		return await this.userRepository.mostActive();
	}

}
