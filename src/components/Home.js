import React, { useEffect } from 'react'
import DriveList from './DriveList'
import SignInButton from './SignInButton'

import { useDispatch } from 'redux-react-hook'
import { receiveAuthToken } from '../modules/driveAuth'
import querystring from 'querystring'

export default function Home(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    const params = querystring.parse(document.location.hash.substring(1))
    if (params.access_token) {
      dispatch(receiveAuthToken(params.access_token))
    }
  })
  return <div className="App">
    Photo Taker
    <DriveList />
    <SignInButton />
  </div>
}