import { IAuthProps } from '.';
import BaseModel from '../Generic/Model/BaseModel';

export default class Auth extends BaseModel implements IAuthProps {
	token: string | null = null;
}
