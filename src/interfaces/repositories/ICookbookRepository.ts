export interface ICookbookRepository<Cookbook> {
    
    getById(id: number) : Promise<Cookbook>;
    
    getAll(limit: number, offset: number) : Promise<{rows: Cookbook[], count: number}>;
    
    create(dto: unknown) : Promise<Cookbook>;

    updateById(id: number, dto: unknown) : Promise<Cookbook>

    deleteById(id: number) : Promise<boolean>;

    linkRecipe(cookbookId: number, recipeId: number) : Promise<boolean>;

    unlinkRecipe(cookbookId: number, recipeId: number) : Promise<boolean>;

    cloneCookbook(id: number, userId: number) : Promise<Cookbook>

    countAll() : Promise<any>; //

    getViews(id: number) : Promise<any>; //

    mostPopular() : Promise<any> //
}