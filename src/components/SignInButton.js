import React from 'react'
import { useDispatch } from 'redux-react-hook'
import { logIn } from '../modules/driveAuth'

export default function SignInButton(props) {
    const dispatch = useDispatch()
    const doSignIn = () => {
        dispatch(logIn())
    }
    return <button onClick={doSignIn}>Sign In</button>
}