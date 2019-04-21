import path from 'path'
import { Dropbox } from 'dropbox'
import { loadState, saveState } from '../localStorage'

const STORAGE_KEY = 'dbx_oauth'
const CLIENT_KEY = '8pe9up5w8yjixxk'

const auth = loadState(STORAGE_KEY)
const dbx = new Dropbox({
    clientId: CLIENT_KEY,
    accessToken: auth,
    fetch
})

export function getAuthToken() {
    return dbx.getAccessToken()
}

export async function signIn() {
    const url = dbx.getAuthenticationUrl('http://localhost:3000/auth');
    window.open(url)
}

export function saveLoginState(token) {
    saveState(STORAGE_KEY, token)
    dbx.setAccessToken(token)
}

export async function signOut() {
    saveState(STORAGE_KEY, null)
    dbx.setAccessToken(null)
}

export async function searchFolders(query) {
    const results = await dbx.filesSearch({
        path: '',
        query: query,
        max_results: 20,
        mode: {'.tag': 'filename'}
    })
    return results.matches
    .filter(match => match.metadata['id'] && match.metadata['.tag'] === 'folder')
    .map(match => {
        return {
            name: match.metadata.name,
            id: match.metadata['id']
        }
    })
}

export async function upload(folderId, base64File) {
    const i = base64File.indexOf('base64,')
    const buffer = Buffer.from(base64File.slice(i + 7), 'base64')
    
    try {
        await dbx.filesUpload({
            path: path.join(folderId, Date.now() + '.jpeg',),
            contents:  buffer
        })
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}



