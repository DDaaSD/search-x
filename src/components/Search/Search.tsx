import React from 'react'
import { Dropdown } from '../../ui-components/DropDown/DropDown'
import { MOCK_RESOURCES } from '../../mockData/resources'
import { LinkSuggestion } from '../../types/LinkSuggestion'

export const Search = () => {
    const renderItem = (item: LinkSuggestion, onClick: (item: LinkSuggestion) => void) => {
        return <div onClick={() => onClick(item)}>
            {item.title}
        </div>
    }

    return <Dropdown
        items={MOCK_RESOURCES}
        renderItem={renderItem}
        getTitle={(item) => item.title}
    />
}