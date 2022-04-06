interface IComment {
    id: number,
    userId: number,
    cookbookId: number,
    text: string,
    rate: number,
    createdAt: number
}


export class Comment implements IComment {
    id: number
    userId: number
    cookbookId: number
    text: string
    rate: number
    createdAt: number

    constructor(comment: any) {
        this.id = comment.id;
        this.userId = comment.userId;
        this.cookbookId = comment.cookbookId;
        this.text = comment.text;
        this.rate = comment.rate;
        this.createdAt = comment.createdAt;
        this.validate();
    }

    validate() {
        if(this.rate < 0 || this.rate > 5 || Math.round(this.rate) != this.rate)
            throw new Error('invalid rate');

        if(this.createdAt < 0)
            throw new Error('invalid created at');

    }



} 