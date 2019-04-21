import { upload } from '../apis/active'

const UPLOAD_START = "upload/UPLOAD_START"
const UPLOAD_SUCCESS = "upload/UPLOAD_SUCCESS"
const UPLOAD_ERROR = "upload/UPLOAD_ERROR"

export default function reducer(state = {
    isUploading: false
}, action = {}
) {
    switch (action.type) {
        case UPLOAD_START:
            return Object.assign({}, state, {
                isUploading: true
            })
        case UPLOAD_SUCCESS:
            return Object.assign({}, state, {
                isUploading: false,
                uploadSuccess: true
            })
        case UPLOAD_ERROR:
            return Object.assign({}, state, {
                isUploading: false,
                uploadSuccess: false
            }) 
        default:
            return state
    }
}


export function uploadFile(folderId, base64Photo) {
    return async dispatch => {
        dispatch({
            type: UPLOAD_START
        })
        const success = await upload(folderId, base64Photo)
        if (success) {
            dispatch({
                type: UPLOAD_SUCCESS
            })
        } else {
            dispatch({
                type: UPLOAD_ERROR
            })
        }
        
    }
}

