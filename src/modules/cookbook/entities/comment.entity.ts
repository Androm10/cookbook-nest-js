interface IComment {
    userId: number,
    cookbookId: number,
    text: string,
    rate: number,
    createdAt: number
}


export class Comment implements IComment {
    userId: number
    cookbookId: number
    text: string
    rate: number
    createdAt: number

    constructor(cookbook: any) {
        this.userId = cookbook.userId;
        this.cookbookId = cookbook.cookbookId;
        this.text = cookbook.text;
        this.rate = cookbook.rate;
        this.createdAt = cookbook.createdAt;
        this.validate();
    }

    validate() {
        if(this.rate < 0 || this.rate > 5 || Math.round(this.rate) != this.rate)
            throw new Error('invalid rate');

        if(this.createdAt < 0)
            throw new Error('invalid created at');

    }



} 