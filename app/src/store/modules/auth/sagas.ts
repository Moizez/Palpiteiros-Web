import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../../services/implementations/AuthService';
import types from './types';

//@ts-ignore
export function* signIn({ payload }) {
	try {
		const { email, password } = payload;
		//@ts-ignore
		const response = yield call(() =>
			AuthService.signIn({
				email,
				password,
			})
		);

		console.log('LOGIN: ', response.data);

		// const { token } = response.data;

		// if (!token) {
		// 	//@ts-ignore
		// 	yield put(openAlert({ message: 'Token não identificado!' }));
		// 	//@ts-ignore
		// 	yield put(signInFailure());
		// } else {
		// }
	} catch (error) {
		// //@ts-ignore
		// yield put(signInFailure());
		// //@ts-ignore
		// yield put(openAlert({ message: `Erro: ${error.message}` }));
		console.log(`Erro: ${error}`);
	}
}

//@ts-ignore
export function* signUp({ payload }) {}

//@ts-ignore
export function* signOut({ payload }) {
	//@ts-ignore
	yield put(classificationsReset());
	//@ts-ignore
	yield put(confrontationReset());
}

export default all([
	takeLatest<string, any>(types.SIGN_IN_REQUEST, signIn),
	takeLatest<string, any>(types.SIGN_UP_REQUEST, signUp),
	takeLatest<string, any>(types.SIGN_OUT, signOut),
]);
