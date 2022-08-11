import { IUserStateProps } from '.';
import { IUserProps } from '../../User';

export default class UserState implements IUserStateProps {
	constructor(
		public user: IUserProps,
		public signed: boolean,
		public loading: boolean
	) {}
}
