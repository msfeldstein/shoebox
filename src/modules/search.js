import { searchFolders } from '../apis/google'
import { debounce } from 'debounce'

const SEARCHING = "SEARCHING"
const GET_RESULTS = "GET_RESULTS"


var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

export default function reducer(state = {
    query: '',
    isSearching: false,
    results: []
}, action = {}
) {
    switch (action.type) {
        case SEARCHING:
            return Object.assign({}, state, {
                isSearching: true,
                query: action.query
            })
        case GET_RESULTS:
            return Object.assign({}, state, {
                isSearching: false,
                results: action.results
            })
        default:
            return state

    }
}

const debouncedSearch = debounce(async (dispatch, query) => {
    const files = await searchFolders(query)
        console.log("Files", files)
        dispatch({
            type: GET_RESULTS,
            results: files
        })
}, 500)

export function search(query) {
    return async dispatch => {
        dispatch({
            type: SEARCHING,
            query
        })
        debouncedSearch(dispatch, query)
    }
}

