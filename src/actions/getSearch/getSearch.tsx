import { MOCK_RESOURCES } from '../../mockData/resources'
import { LinkSuggestion } from '../../types/LinkSuggestion'


const getMockResults = (search: string) => {
    return MOCK_RESOURCES.filter(item => item.title.toLowerCase().startsWith(search.toLowerCase()))
}

export const getSearch = (search: string): Promise<LinkSuggestion[] | unknown> => {
    return new Promise<LinkSuggestion[]>(resolve =>
        setTimeout(() => {
            if (search === '') {
                resolve([])
            } else {
                const suggestions = getMockResults(search)
                resolve(suggestions)
            }
        }, 1000)
    )
}