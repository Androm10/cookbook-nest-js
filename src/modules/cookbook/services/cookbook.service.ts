import { BadRequestException, Injectable } from "@nestjs/common";
import { CookbookRepository } from "../repositories/cookbook.repository"; 

@Injectable()
export class CookbookService {
	constructor(private readonly cookbookRepo: CookbookRepository) {}

	async getById(id: number) {
		const cookbook = await this.cookbookRepo.getById(id);
		
		if(!cookbook)
			throw new Error('No such cookbook');

		return cookbook;
  	}

	async getAll() {
		const cookbooks = await this.cookbookRepo.getAll();
		return cookbooks;
	}

	async create(cookbookData: any) {
		
		const created = await this.cookbookRepo.create(cookbookData);
		return created;
	}

	async updateById(id: number, cookbookData: any) {
		const updated = await this.cookbookRepo.updateById(id, cookbookData);

		if(!updated)
			throw new Error('No such cookbook');

		return updated;
	}

	async deleteById(id: number) {
		const deleted = await this.cookbookRepo.deleteById(id);
		
		if(!deleted)
			throw new Error('Cannot delete cookbook');

		return deleted;
	}

	async linkRecipe(id: number, recipeId: number) {
		const cookbook = await this.cookbookRepo.getById(id);

		if(!cookbook) {
			throw new BadRequestException('No such cookbook');
		}

		const link = await this.cookbookRepo.linkRecipe(id, recipeId);

		if(!link) {
			throw new Error('Cannot add this recipe'); 
		}
		return link;
	}

	async unlinkRecipe(id: number, recipeId: number) {
		const cookbook = await this.cookbookRepo.getById(id);

		if(!cookbook) {
			throw new BadRequestException('No such cookbook');
		}

		const link = await this.cookbookRepo.unlinkRecipe(id, recipeId);

		if(!link) {
			throw new BadRequestException('Cannot unlink this recipe'); 
		}

		return link;
	}
}
