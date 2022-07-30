import { all, put, takeLatest } from 'redux-saga/effects';
import types from './types';

export function* signIn({ payload }) {
	try {
		const { email, password } = payload;
		const response = yield call(api.post, '/auth/signin', { email, password });

		// console.log('LOGIN: ', response.data)

		const { token } = response.data;

		if (!token) {
			//@ts-ignore
			yield put(openAlert({ message: 'Token não identificado!' }));
			//@ts-ignore
			yield put(signInFailure());
		} else {
			const profile: TProfileProps = response.data;

			yield put(
				//@ts-ignore
				signInSuccess({ token: response.data.token, profile: profile })
			);
			if (response.data.image?.url) {
				//@ts-ignore
				yield put(setUserReducer({ uri: response.data.image?.url }, 'avatar'));
			}
			const keys = keysByJackpots(profile.myJackpots);
			yield put(
				//@ts-ignore
				requestMyRankings({
					apiKeys: keys,
				})
			);
		}
	} catch (error) {
		//@ts-ignore
		yield put(signInFailure());
		//@ts-ignore
		yield put(openAlert({ message: `Erro: ${error.message}` }));
		console.log(`Erro: ${error}`);
	}
}

export function* signUp({ payload }) {
	try {
		const response = yield call(api.post, '/users', payload);
		const { token } = response.data;

		console.log('SIGN UP: ', response.data);

		if (!token) {
			//@ts-ignore
			yield put(openAlert({ message: 'Token não identificado!' }));
			//@ts-ignore
			yield put(signInFailure());
		} else {
			yield put(
				//@ts-ignore
				signInSuccess({ token: response.data.token, profile: response.data })
			);
		}
	} catch (error) {
		//@ts-ignore
		yield put(signInFailure());
		//@ts-ignore
		yield put(openAlert({ message: `Erro: ${error.message}` }));
		console.log(`Erro: ${error}`);
	}
}

export function* loadSignInRequest({ payload }) {
	try {
		const response = yield call(api.post, `/auth/loadSignin/`, payload);

		if (response.status == 200) {
			const profile = response.data;
			yield put(
				//@ts-ignore
				updateUserSuccess({
					token: response.data.token,
					profile: profile,
				})
			);
			const keys = keysByJackpots(profile.myJackpots);
			yield put(
				//@ts-ignore
				requestMyRankings({
					apiKeys: keys,
				})
			);
		} else {
			console.log('ERROR', 'else');
			//@ts-ignore
			yield put(signOutRequest());
		}
	} catch (error) {
		console.log('ERROR', 'catch');
		console.log(`${error}`);
		//@ts-ignore
		yield put(signOutRequest());
	}
}

export function* signOut({ payload }) {
	//@ts-ignore
	yield put(classificationsReset());
	//@ts-ignore
	yield put(confrontationReset());
}

export default all([
	takeLatest<string, any>(types.SIGN_IN_REQUEST, signIn),
	takeLatest<string, any>(types.SIGN_UP_REQUEST, signUp),
	takeLatest<string, any>(types.LOAD_SIGN_IN_REQUEST, loadSignInRequest),
	takeLatest<string, any>(types.SIGN_OUT, signOut),
]);
