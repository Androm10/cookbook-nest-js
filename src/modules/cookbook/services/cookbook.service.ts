import {
	BadRequestException,
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
	StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { COOKBOOK_REPOSITORY } from 'src/constants/repositories';
import { ICookbookRepository } from '../../../interfaces/repositories/ICookbookRepository';
import { Cookbook } from '../entities/cookbook.entity';

@Injectable()
export class CookbookService {
	constructor(
		@Inject(COOKBOOK_REPOSITORY)
		private cookbookRepository: ICookbookRepository<Cookbook>,
	) {}

	async getById(id: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) throw new NotFoundException('No such cookbook');

		return cookbook;
	}

	async getAll(limit: number, page: number, query: any) {
		const cookbooks = await this.cookbookRepository.getAll(
			limit,
			(page - 1) * limit,
			query
		);

		return {
			body: cookbooks.rows,
			count: cookbooks.count,
			pages: Math.ceil(cookbooks.count / limit),
			page: page,
		};
	}

	async create(cookbookData: any) {
		const created = await this.cookbookRepository.create(cookbookData);
		return created;
	}

	async updateById(id: number, cookbookData: any) {
		const updated = await this.cookbookRepository.updateById(
			id,
			cookbookData,
		);

		if (!updated) {
			throw new NotFoundException('No such cookbook');
		}
		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.cookbookRepository.deleteById(id);

		if (!deleted) {
			throw new NotFoundException('Cannot delete cookbook');
		}
		return deleted;
	}

	async linkRecipe(id: number, recipeId: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}

		const link = await this.cookbookRepository.linkRecipe(id, recipeId);

		if (!link) {
			throw new BadRequestException('Cannot add this recipe');
		}
		return link;
	}

	async unlinkRecipe(id: number, recipeId: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}

		const link = await this.cookbookRepository.unlinkRecipe(id, recipeId);

		if (!link) {
			throw new BadRequestException('Cannot unlink this recipe');
		}
		return link;
	}

	async cloneCookbook(id: number, userId: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}
		return await this.cookbookRepository.cloneCookbook(id, userId);
	}

	async getRecipes(id: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}

		return await this.cookbookRepository.getRecipes(id);
	}

	async uploadAvatar(id: number, file: Express.Multer.File, userId: number) {
		const cookbook = await this.cookbookRepository.getById(id);
		if (!cookbook) {
			throw new NotFoundException('No such cookbook');
		}
		if (cookbook.creatorId != userId) {
			throw new ForbiddenException('Cannot update foreign objects');
		}
		return await this.cookbookRepository.updateById(id, {
			avatar: file.path,
		});
	}

	async getAvatar(id: number): Promise<StreamableFile> {
		const cookbook = await this.cookbookRepository.getById(id);
		if (!cookbook) {
			throw new NotFoundException('No such cookbook');
		}
		if (!cookbook.avatar || cookbook.avatar == 'none') {
			throw new BadRequestException('Nothing to download');
		}
		const fileStream = createReadStream(cookbook.avatar);
		return new StreamableFile(fileStream);
	}

	async countAll() {
		return await this.cookbookRepository.countAll();
	}

	async getViews(id: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}
		return await this.cookbookRepository.getViews(id);
	}

	async getLikes(id: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}
		return await this.cookbookRepository.getLikes(id);
	}

	async getCommentsCount(id: number) {
		const cookbook = await this.cookbookRepository.getById(id);

		if (!cookbook) {
			throw new BadRequestException('No such cookbook');
		}
		return await this.cookbookRepository.getCommentsCount(id);
	}

	async mostPopular() {
		return await this.cookbookRepository.mostPopular();
	}
}
