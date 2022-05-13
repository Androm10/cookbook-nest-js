export interface IRecipeRepository<Recipe> {
	getById(id: number): Promise<Recipe>;

	getAll(
		limit: number,
		offset: number,
	): Promise<{ rows: Recipe[]; count: number }>;

	create(dto: unknown): Promise<Recipe>;

	updateById(id: number, dto: unknown): Promise<Recipe>;

	deleteById(id: number): Promise<boolean>;

	countAll(): Promise<any>; //

	getViews(id: number): Promise<any>; //

	getLikes(id: number): Promise<any>; //
	
	getCommentsCount(id: number): Promise<any>; //

	mostPopular(): Promise<any>; //
}
