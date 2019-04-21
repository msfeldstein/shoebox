import { searchFolders } from '../apis/active'
import { debounce } from 'debounce'

const SEARCHING = "search/SEARCHING"
const GET_RESULTS = "search/GET_RESULTS"

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

