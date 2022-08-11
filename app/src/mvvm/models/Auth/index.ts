import { IBaseModelProps } from '../Generic/Model';

export interface IAuthProps extends IBaseModelProps {
	token: string | null;
}
