import { IUserProps } from '../../User';

export interface IUserStateProps {
	user: IUserProps | null;
	signed: boolean;
	loading: boolean;
}
