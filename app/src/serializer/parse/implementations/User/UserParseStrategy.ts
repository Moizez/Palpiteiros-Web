import Auth from '../../../../mvvm/models/Auth/Auth';
import { IUserStateProps } from '../../../../mvvm/models/State/User';
import User from '../../../../mvvm/models/User/User';
import ISerializerParseStrategy, {
	Type,
} from '../../interfaces/SerializerParseStrategy';

class UserSerializeParseStrategy
	implements ISerializerParseStrategy<User, IUserStateProps>
{
	parse(entries: Type[]): User[] {
		return entries.map((entry) => {
			const user = new User();
			const auth = new Auth();
			auth.token = entry['token'];
			user.email = entry['email'];
			user.phone = entry['phone'];
			user.id = entry['id'];
			user.auth = auth;
			return user;
		});
	}

	parseDraft(props: IUserStateProps): IUserStateProps {
		return {
			user: props.user,
			loading: props.loading,
			signed: props.signed,
		};
	}
}

export default new UserSerializeParseStrategy();
