export function getStorageItem<T>(key: string) {
    const localStorageValue = localStorage.getItem(key)
    if (localStorageValue != null) {
        return JSON.parse(localStorageValue) as T
    }
}