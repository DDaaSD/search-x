import { useState, useEffect } from 'react'
import { setValueToStorage } from '../../helpers/setValueToStorage/setValueToStorage'
import { compareTwoStrings } from '../../helpers/compareTwoStrings/compareTwoStrings'
import { initlocalStorage } from '../../helpers/initLocalStorage/initLocalStorage'

type StorageHook<T> = {
    update: (id: string, value: T) => Promise<void>
    create: (value: T) => Promise<void>
    getValues: () => Promise<T[]>
    values: T[]
}

function useStorage<T extends { id: string, title: string }>(key: string, defaultValue: T[], storageObject: Storage): StorageHook<T> {
    const [values, setValues] = useState<T[]>(() => {
        return initlocalStorage('searchApiKey', defaultValue)
    })

    useEffect(() => {
        if (values === undefined) {
            return
        }
        setValueToStorage(key, values)
    }, [key, values, storageObject])


    const update = (id: string, newValue: T): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const findValue = values.find(v => v.id === id)
            if (!findValue) {
                reject(new Error('Value not found'))
                return
            }

            const newArray = values.map(value => value.id === newValue.id ? { ...value, ...newValue } : value)
            setValues(newArray)
            resolve()
            return
        })
    }

    const create = (newValue: T): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const itemInDB = values.find(v => compareTwoStrings(v.title, newValue.title))

            if (itemInDB) {
                reject('Item already exist in db')
                return
            }

            const newArray = [...values, { ...newValue }]
            setValues(newArray)
            resolve()
            return
        })
    }

    const getValues = () => new Promise<T[]>((resolve, reject) => {

        setTimeout(() => {
            if (values.length === 0)
                reject([])
            else resolve(values)
        }, 550)
    })

    return { update, create, getValues, values }
}

export function useLocalStorage<T extends { id: string, title: string }>(key: string, defaultValue: T[]) {
    return useStorage(key, defaultValue, window.localStorage)
}