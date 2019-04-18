import React, { useCallback } from 'react'
import SearchBox from './SearchBox'
import { useMappedState } from 'redux-react-hook'
import { Link } from 'react-router-dom'

export default function DriveList(props) {
    const mapState = useCallback(state => {
        return state.search.results
    }, [])
    const results = useMappedState(mapState)
    return <div>
        <SearchBox />
        Drive List
        {results.map(result => {
            return <Link to={`/drive/${result.id}/${result.name}`} key={result.id}>{result.name}</Link>
        })}
        
    </div>
}