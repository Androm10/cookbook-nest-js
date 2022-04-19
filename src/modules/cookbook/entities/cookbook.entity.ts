interface ICookbook {
	id: number;
	creatorId: number;
	name: string;
	avatar: string;
	description: string;
}

export class Cookbook implements ICookbook {
	id: number;
	creatorId: number;
	name: string;
	avatar: string;
	description: string;

	constructor(cookbook: any) {
		this.id = cookbook.id;
		this.creatorId = cookbook.creatorId;
		this.name = cookbook.name;
		this.avatar = cookbook.avatar;
		this.description = cookbook.description;
		this.validate();
	}

	validate() {
		if (this.name.length < 3 || this.name.length > 20)
			throw new Error('invalid name length');

		if (this.creatorId < 0) throw new Error('invalid creator id');
	}
}
