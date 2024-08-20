import { MOCK_RESOURCES } from '../../mockData/resources'
import { LinkSuggestion } from '../../types/LinkSuggestion'
import { uniqueId } from 'lodash'
import { useLocalStorage } from '../useStorage/useStorage'
import { useEffect } from 'react'
import { useAction } from '../useAction/useAction'

export const useSearchApi = (search: string, preload: boolean = false) => {
    const defaultValue: LinkSuggestion[] = MOCK_RESOURCES.map(item => ({ ...item, id: uniqueId() }))
    const { update, create, getValues, values: currentValue} = useLocalStorage<LinkSuggestion>('searchApiKey', defaultValue)
    const getSearchWrapper = useAction<void, LinkSuggestion[]|undefined>(getValues)
    const query = getSearchWrapper
    const { data = [], fetch, time, status } = query

    useEffect(() => {
        if(!preload && !search){
            return
        }
        fetch()
        console.log(time)
    }, [search, currentValue])

    const getFilteredData = () => {
        if(!search) {
            return data.filter(item => item.isRecent)
        }
        
        return data.filter(item => item.title.toLowerCase().startsWith(search.toLowerCase()))
    }
 
    const filteredValues = getFilteredData()
    return {values: filteredValues, update, create, time, status, fetch}
}