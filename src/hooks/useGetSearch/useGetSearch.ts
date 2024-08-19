import { useEffect } from 'react'
import { getSearch } from '../../actions/getSearch/getSearch'
import { useAction } from '../useAction/useAction'

export const useGetSearch = (search: string) => {

    const info = useAction(getSearch)
    const { fetch } = info

    useEffect(() => {
        fetch(search)
    }, [search])

    return 
}