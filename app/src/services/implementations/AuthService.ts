import User from '../../mvvm/models/User/User';
import { TAuthSign } from '../../types/Request/Auth';
import BaseServiceAxios from '../abstract/BaseServiceAxios';
import IAuthService from '../interfaces/AuthService';

class AuthService extends BaseServiceAxios<User> implements IAuthService {
	constructor() {
		super('/auth/signin');
		console.log(this.connector.post);
	}

	public async signIn({ email, password }: TAuthSign): Promise<any> {
		return await this.connector.post<any, TAuthSign>(this.endpoint, {
			email,
			password,
		});
	}
}

export default new AuthService();
