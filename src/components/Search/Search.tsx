import React, { useState } from 'react'
import { Dropdown } from '../../ui-components/DropDown/DropDown'
import { LinkSuggestion } from '../../types/LinkSuggestion'
import { DropdownItem } from '../../ui-components/DropdownItem/DropdownItem'
import { useSearchApi } from '../../hooks/useSearchApi/useSearchApi'
import { sortByRecent } from '../../helpers/sortByRecent/sortByRecent'
import { useSearchContext } from '../../hooks/useSearchContext/useSearchContext'
import { compareTwoStrings } from '../../helpers/compareTwoStrings/compareTwoStrings'
import { uniqueId } from 'lodash'

export const Search = () => {
    const [search, setSearch] = useState('')
    const { values, update, create } = useSearchApi(search, true)
    const { setSearchValue } = useSearchContext()

    const renderItem = (item: LinkSuggestion, onClick: (item: LinkSuggestion) => void) => {

        return <DropdownItem
            key={item.id}
            suggestedItem={item}
            onClick={() => onClick(item)}
            onRemove={onRemove}
        />
    }

    const updateItemIfExist = (search: string) => {
        const findValue = values.find(v => compareTwoStrings(v.title, search))
        if (findValue) {
            update(findValue.id, { ...findValue, isRecent: true })
        }
    }

    const onRemove = (item: LinkSuggestion) => {
        update(item.id, { ...item, isRecent: false })
    }

    const createSearch = async (search: string) => {
        const newValue = {
            id: uniqueId(),
            title: search,
            description: '',
            url: '',
            isRecent: true,
        }
        try {
            await create(newValue)
        } catch {
            updateItemIfExist(search)
        }
    }

    const onSelect = (item: LinkSuggestion | string) => {

        if (typeof item === 'string') {
            setSearchValue(item)
            createSearch(search)
            return
        }
        setSearchValue(item.title)
        update(item.id, { ...item, isRecent: true })
    }


    const firstTenElements = values.sort(sortByRecent).slice(0, 10)

    return <Dropdown
        items={firstTenElements || []}
        renderItem={renderItem}
        getTitle={(item) => item.title}
        onType={val => setSearch(val)}
        onSelect={onSelect}
    />
}