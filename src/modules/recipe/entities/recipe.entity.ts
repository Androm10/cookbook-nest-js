interface IRecipe {
	id: number;
	creatorId: number;
	name: string;
	avatar: string;
	description: string;
	directions: string;
	ingridients: string;
	cookingTime: number;
}

export class Recipe implements IRecipe {
	id: number;
	creatorId: number;
	name: string;
	avatar: string;
	description: string;
	directions: string;
	ingridients: string;
	cookingTime: number;

	constructor(recipe: any) {
		this.id = recipe.id;
		this.creatorId = recipe.creatorId;
		this.name = recipe.name;
		this.avatar = recipe.avatar;
		this.description = recipe.description;
		this.directions = recipe.directions;
		this.ingridients = recipe.ingridients;
		this.cookingTime = recipe.cookingTime;

		this.validate();
	}

	validate() {
		if (this.name.length < 3 || this.name.length > 30)
			throw new Error('invalid name length');

		if (this.creatorId < 0) throw new Error('invalid creator id');

		if (
			this.cookingTime < 0 ||
			Math.round(this.cookingTime) != this.cookingTime
		)
			throw new Error('invalid cooking time');
	}
}
