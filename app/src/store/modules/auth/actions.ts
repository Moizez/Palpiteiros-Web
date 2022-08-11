import { IUserStateProps } from '../../../mvvm/models/State/User';
import { IUserProps } from '../../../mvvm/models/User';
import UserSerializeParseStrategy from '../../../serializer/parse/implementations/User/UserParseStrategy';
import { IAction } from '../../../types/Action';
import types from './types';

export function signInRequest(payload: {
	email: string;
	password: string;
}): IAction<
	{
		email: string;
		password: string;
	},
	IUserProps,
	IUserStateProps
> {
	return {
		type: types.SIGN_IN_REQUEST,
		payload,
		instance: UserSerializeParseStrategy,
	};
}

// export function signInSuccess({ token, profile }: TSignInSucces): TAction<any> {
// 	return {
// 		type: types.SIGN_IN_SUCCESS,
// 		payload: { token, profile },
// 	};
// }

// export function signUpRequest(payload: any): TAction<any> {
// 	return {
// 		type: types.SIGN_UP_REQUEST,
// 		payload,
// 	};
// }

export function signInFailure(): IAction<any, IUserProps, IUserStateProps> {
	return {
		type: types.SIGN_IN_FAILURE,
		instance: UserSerializeParseStrategy,
	};
}

export function signOutRequest(): IAction<any, IUserProps, IUserStateProps> {
	return {
		type: types.SIGN_OUT,
		instance: UserSerializeParseStrategy,
	};
}
