import { IAuthProps } from '../Auth';
import { IBaseModelProps } from '../Generic/Model';

export interface IUserProps extends IBaseModelProps {
	auth: IAuthProps | null;
	name: string | null;
	email: string | null;
	phone: string | null;
}

export type TUserProps = {
	id: number;
	name: string;
	email: string;
	phone: string;
	token: string;
};
