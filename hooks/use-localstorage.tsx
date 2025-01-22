export function useLocalStorage() {
    const getLocalStorage = (key: string) => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : null
    }

    const setLocalStorage = (key: string, value: string) => {
        if (value === null) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    const removeLocalStorage = (key: string) => {
        localStorage.removeItem(key)
    }

    return { setLocalStorage, getLocalStorage, removeLocalStorage }
}
