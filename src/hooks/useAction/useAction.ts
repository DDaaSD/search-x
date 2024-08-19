import { useState } from 'react'
import { StatusActionType  } from '../../types/Action'

type ReturnType<T, G> = {
    data: T|null| unknown,
    time: number,
    status: StatusActionType,
    fetch: (query: G) => void
}

export function useAction<T, G>(action: (query: G) => Promise<T>): ReturnType<T,G> {
    const [data, setData] = useState<T|null>(null)
    const [status, setStatus] = useState<StatusActionType>('IDLE')
    const [time, seTime] = useState(0)

    const fetch = async (query: G) => {
        setStatus('LOADING')
        seTime(0)
        const start = Date.now()
        try {
            const result = await action(query)
            const secSpent = (Date.now() - start) / 1000
            seTime(secSpent)
            setData(result)
            setStatus('SUCCESS')
        } catch (error) {
            setStatus('ERROR')
            seTime(0)
            throw error
        }
    }


    return {data, time, status, fetch}    
}