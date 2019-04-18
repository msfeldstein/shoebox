import React, { useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { search } from '../modules/search'

export default function SearchBox(props) {
    const dispatch = useDispatch()
    const mapState = useCallback(state => {
        return state.search.query
    }, [])
    const value = useMappedState(mapState)

    return <div>
        <input
            type="text"
            placeholder="Search for a directory"
            value={value}
            onChange={e => dispatch(search(e.target.value))}>
        </input>
    </div>
}