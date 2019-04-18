import React from 'react'
import DriveList from './DriveList'
import SignInButton from './SignInButton'

export default function Home(props) {
    return <div className="App">
    Photo Taker
    <DriveList />
    <SignInButton />
  </div>
}