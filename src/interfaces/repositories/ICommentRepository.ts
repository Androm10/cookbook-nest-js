export interface ICommentRepository<Comment> {
    
    getById(id: number) : Promise<Comment>;
    
    getAll(recipeId: number) : Promise<Comment[]>;
    
    create(dto: unknown) : Promise<Comment>;

    updateById(id: number, dto: unknown) : Promise<Comment>

    deleteById(id: number) : Promise<boolean>;
}