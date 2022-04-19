interface IUser {
	id: number;
	login: string;
	password: string;
	status: string;
}

export const StatusTypes = ['active', 'block', 'delete'];

export class User implements IUser {
	id: number;
	login: string;
	status: string;
	password: string;

	constructor(user: any) {
		this.id = user.id;
		this.login = user.login;
		this.password = user.password;
		this.status = user.status;
		this.validate();
	}

	validate() {
		if (this.login.length < 3 || this.login.length > 20)
			throw new Error('invalid login length');

		if (!StatusTypes.includes(this.status))
			throw new Error('invalid status type');
	}
}
