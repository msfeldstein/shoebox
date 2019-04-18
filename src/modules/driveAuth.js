import { signIn, signOut } from '../apis/google'

const SIGN_IN = "SIGN_IN"
const SIGNING_IN = "SIGNING_IN"
const FINISH_SIGNING_IN = "FINISH_SIGNING_IN"
const SIGN_OUT = "SIGN_OUT"

export default function reducer(state = {
    isLoggedIn: false,
    signInInProgress: false
}, action = {}) {
    switch (action.type) {
        case SIGNING_IN:
            return Object.assign({}, state, {
                signInInProgress: true
            })
        case FINISH_SIGNING_IN:
            return Object.assign({}, state, {
                signInInProgress: false
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

export function logOut() {

}

export function showList() {

}