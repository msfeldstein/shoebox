import React, { useCallback } from 'react'
import SearchBox from './SearchBox'
import { useMappedState } from 'redux-react-hook'
import { getAuthToken, encodeForSubdomain } from '../apis/active'

function launch(id, name) {
    const encID = encodeForSubdomain(id)
    const hostname = window.location.hostname.match(/([a-z0-9-]*?)\.[a-z]{2,}$/)[0];
    const loc = document.location
    const port = loc.port
    const url = `${loc.protocol}//${encID}.${hostname}:${port}/#/drive/${id}/${name}?&access_token=${getAuthToken()}`
    window.open(url)
}

export default function DriveList(props) {
    const mapState = useCallback(state => {
        return state.search.results
    }, [])
    const results = useMappedState(mapState)

    return <div>
        <SearchBox />
        Drive List
        {results.map(result => {
            return <div onClick={e => launch(result.id, result.name)}>{result.name}</div>
        })}
        
    </div>
}
console.log("env", process.env.PUBLIC_URL)