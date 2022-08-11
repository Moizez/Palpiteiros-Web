import produce from 'immer';
import { IUserStateProps } from '../../../mvvm/models/State/User';
import UserState from '../../../mvvm/models/State/User/UserState';
import User from '../../../mvvm/models/User/User';
import { IAction } from '../../../types/Action';
import types from './types';

const INITIAL_STATE: IUserStateProps = new UserState(new User(), false, false);

function app(
	state = INITIAL_STATE,
	action: IAction<any, User, IUserStateProps>
) {
	return produce(state, (draft) => {
		// console.log('PAYLOAD', action.payload)

		switch (action.type) {
			case types.SIGN_IN_REQUEST: {
				return action.instance.parseDraft({
					...draft,
					loading: true,
				});
			}

			case types.SIGN_IN_SUCCESS: {
				const user = action.instance.parse([action.payload])[0];
				return action.instance.parseDraft({
					signed: true,
					loading: false,
					user,
				});
			}

			case types.SIGN_UP_REQUEST: {
				return action.instance.parseDraft({
					...draft,
					loading: true,
				});
			}

			case types.SIGN_IN_FAILURE: {
				return action.instance.parseDraft({
					...draft,
					loading: false,
				});
			}

			case types.SIGN_OUT: {
				return action.instance.parseDraft({
					...INITIAL_STATE,
				});
			}

			default:
				return state;
		}
	});
}

export default app;
