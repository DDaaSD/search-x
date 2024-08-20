export function setValueToStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
}
