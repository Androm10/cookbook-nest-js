interface IComment {
    userId: number,
    recipeId: number,
    text: string,
    rate: number,
    createdAt: number
}


export class Comment implements IComment {
    userId: number
    recipeId: number
    text: string
    rate: number
    createdAt: number

    constructor(recipe: any) {
        this.userId = recipe.userId;
        this.recipeId = recipe.recipeId;
        this.text = recipe.text;
        this.rate = recipe.rate;
        this.createdAt = recipe.createdAt;
        this.validate();
    }

    validate() {
        if(this.rate < 0 || this.rate > 5 || Math.round(this.rate) != this.rate)
            throw new Error('invalid rate');

        if(this.createdAt < 0)
            throw new Error('invalid created at');

    }



} 