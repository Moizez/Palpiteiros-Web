import { TAuthSign } from '../../types/Request/Auth';

export default interface IAuthService {
	signIn({ email, password }: TAuthSign): Promise<any>;
}
