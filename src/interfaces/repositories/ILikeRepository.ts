export interface ILikeRepository {
	like(id: number, userId: number): Promise<boolean>;

	unlike(id: number, userId: number): Promise<boolean>;

	isLiked(id: number, userId: number): Promise<boolean>;
}
