import { combineReducers } from 'redux'
import search from './search'
import driveAuth from './driveAuth'

export default combineReducers({
    search,
    driveAuth
})