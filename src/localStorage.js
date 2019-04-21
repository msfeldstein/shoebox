export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}

export const saveState = (key, state) => {
    try {
        const json = JSON.stringify(state)
        localStorage.setItem(key, json)
    } catch (e) {

    }
}