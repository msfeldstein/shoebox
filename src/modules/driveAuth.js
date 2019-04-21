import { signIn, signOut, getAuthToken, saveLoginState } from '../apis/active'
import { loadState, saveState } from '../localStorage'

const SIGN_IN = "auth/SIGN_IN"
const SIGNING_IN = "auth/SIGNING_IN"
const FINISH_SIGNING_IN = "auth/FINISH_SIGNING_IN"
const SIGN_OUT = "auth/SIGN_OUT"

export default function reducer(state = {
    signInInProgress: false,
    token: getAuthToken()
}, action = {}) {
    switch (action.type) {
        case SIGNING_IN:
            return Object.assign({}, state, {
                signInInProgress: true
            })
        case FINISH_SIGNING_IN:
            saveLoginState(action.token)
            return Object.assign({}, state, {
                signInInProgress: false,
                token: action.token,
            })
        case SIGN_OUT:
            return Object.assign({}, state, {
                token: null
            })
        default:
            return state
    }
}

export function logIn() {
    return async dispatch => {
        dispatch({
            type: SIGNING_IN
        })
        await signIn()
        dispatch({
            type: FINISH_SIGNING_IN
        })
    }
}

export function receiveAuthToken(token) {
    return {
        type: FINISH_SIGNING_IN,
        token
    }
}

export function logOut() {
    return {
        type: SIGN_OUT
    }
}

export function showList() {

}