export interface IUserRepository<User> {
	getById(id: number): Promise<User>;

	getAll(
		limit: number,
		offset: number,
	): Promise<{ rows: User[]; count: number }>;

	create(dto: unknown): Promise<User>;

	updateById(id: number, dto: unknown): Promise<User>;

	deleteById(id: number): Promise<boolean>;

	getByLogin(login: string): Promise<User>;

	registerUser(userData: {
		login: string;
		password: string;
		status: string;
	}): Promise<User>;

	updateProfile(userId: number, userInfo: any): Promise<any>; //

	getProfile(userId: number): Promise<any>;

	getRoles(userId: number): Promise<string[]>;

	getStatusStats(): Promise<any>; //

	mostActive(): Promise<any>; //
}
