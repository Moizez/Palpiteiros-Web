import { IUserProps } from '.';
import { IAuthProps } from '../Auth';
import BaseModel from '../Generic/Model/BaseModel';

export default class User extends BaseModel implements IUserProps {
	constructor() {
		super();
	}
	auth: IAuthProps | null = null;
	name: string | null = null;
	email: string | null = null;
	phone: string | null = null;
}
