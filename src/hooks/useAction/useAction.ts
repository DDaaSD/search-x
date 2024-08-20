import { useState } from 'react'
import { StatusActionType  } from '../../types/Action'

type ReturnType<Query, Response> = {
    data: Response | undefined,
    time: number,
    status: StatusActionType,
    fetch: (query: Query) => void
}

export function useAction<Query, Response>(action: (query: Query) => Promise<Response>): ReturnType<Query,Response> {
    const [data, setData] = useState<Response|undefined>()
    const [status, setStatus] = useState<StatusActionType>('IDLE')
    const [time, seTime] = useState(0)

    const fetch = async (query: Query) => {
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