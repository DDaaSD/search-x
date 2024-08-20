import { getStorageItem } from '../getStorageItem/getStorageItem'
import { setValueToStorage } from '../setValueToStorage/setValueToStorage'

export function initlocalStorage<T>(key: string, value: T[]): T[] {
    const localStorageValue: T[]|undefined  = getStorageItem(key)
    if(localStorageValue) {
        return localStorageValue
    }
    setValueToStorage(key, value)
    return value
}
