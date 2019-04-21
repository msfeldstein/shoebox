import React, { useCallback} from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { logIn, logOut } from '../modules/driveAuth'

export default function SignInButton(props) {
    const dispatch = useDispatch()
    const mapState = useCallback(state => {
        console.log("STate", state)
        return {
            token: state.driveAuth.token,
            isLoggedIn: !!state.driveAuth.token
        }
        return state.driveAuth.token
    }, [])
    const state = useMappedState(mapState)

    const onClick = () => {
        if (state.isLoggedIn) {
            dispatch(logOut())
        } else {
            dispatch(logIn())
        }
    }
    const label = state.isLoggedIn ? "Sign Out" : "Sign In"
    return <button onClick={onClick}>{label}</button>
}