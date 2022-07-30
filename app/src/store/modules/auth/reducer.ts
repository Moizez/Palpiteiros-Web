import produce from "immer";
import types from "./types";

const INITIAL_STATE = {
    user: null,
    code: null,
    signed: false,
    loading: false,
}

function app(state = INITIAL_STATE, action) {

    return produce(state, draft => {

        // console.log('PAYLOAD', action.payload)

        switch (action.type) {

            case types.SET_USER_REDUCER: {
                draft[action.key] = action.payload
                draft.loading = false
                return draft
            }

            case types.SET_USER: {
                draft.user = action.payload 
                draft.loading = false
                return draft
            }

            case types.SIGN_IN_REQUEST: {
                draft.loading = true
                return draft
            }

            case types.SIGN_IN_SUCCESS: {
                draft.code = action.payload
                draft.signed = true
                draft.loading = false
                return draft
            }

            case types.SIGN_OUT: {
                draft.user = null
                draft.code = null
                draft.signed = false
                draft.loading = false
                return draft
            }

            default:
                return state
        }

    })
}

export default app