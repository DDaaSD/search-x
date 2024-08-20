import { uniqueId } from 'lodash'
import { MOCK_RESOURCES } from '../../mockData/resources'
import { LinkSuggestion } from '../../types/LinkSuggestion'


const getMockResults = (search: string) => {
    return MOCK_RESOURCES.filter(item => item.title.toLowerCase().startsWith(search.toLowerCase()))
}

export const getSearch = (search: string): Promise<LinkSuggestion[] | undefined> => {
    return new Promise<LinkSuggestion[]>(resolve =>
        setTimeout(() => {
            if (search === '') {
                resolve([])
            } else {
                const res = getMockResults(search)
                const suggestions: LinkSuggestion[] = res.map(item => ({ ...item, id: uniqueId() }))
                resolve(suggestions)
            }
        }, 1000)
    )
}
