import { LinkSuggestion } from '../../types/LinkSuggestion'

export const sortByRecent = (a: LinkSuggestion, b: LinkSuggestion) => {
    if (a.isRecent === b.isRecent) {
        return 0
    }
    return a.isRecent ? -1 : 1
}