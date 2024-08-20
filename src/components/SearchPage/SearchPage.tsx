import React, { useState } from 'react'
import styled from 'styled-components'
import { useSearchContext } from '../../hooks/useSearchContext/useSearchContext'
import { useSearchApi } from '../../hooks/useSearchApi/useSearchApi'
import { Pagination } from '../../ui-components/Pagination/Pagination'
import { SuggestedList } from '../SuggestedList/SuggestedList'
import { Search } from '../Search/Search'

const ITEMS_PER_PAGE = 10

const StyledAppWrapper = styled.div`
   justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    max-width: 700px;
    margin: auto;
`

const SyledWrapperLinks = styled.div`
    width: 100%;
    min-height: 900px;
    padding-top: 20px;
`

const StyledMetadata = styled.div`
    padding: 0px 10px;
    color: #9aa0a6;
`

const StyledNotFound = styled.div`

padding: 40px;
`

export const SearchPage = () => {
    const { searchValue } = useSearchContext()
    const { values, time, status } = useSearchApi(searchValue)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const valuesWithUrl = values.filter(value => value.url.trim())
    const showResults = status === 'SUCCESS' && valuesWithUrl.length > 0

    const handleClick = (url: string) => {
        window.location.href = url
    }


    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentItems = valuesWithUrl.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    const totalPages = Math.ceil(valuesWithUrl.length / ITEMS_PER_PAGE)

    const renderMetadate = () => {
        if (!showResults) {
            return <></>
        }

        return <StyledMetadata>
            Found Results: {valuesWithUrl.length} <strong>({time} seconds)</strong>
        </StyledMetadata>
    }

    const renderSuggestionList = () => {
        if (status === 'IDLE') {
            return <></>
        }

        if (!showResults) {
            return <StyledNotFound><strong>Not found</strong></StyledNotFound>
        }

        return <SyledWrapperLinks>
            {renderMetadate()}
            <SuggestedList
                suggestions={currentItems}
                onSelect={handleClick}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </SyledWrapperLinks>

    }

    return <StyledAppWrapper>
        <Search />
        {renderSuggestionList()}
    </StyledAppWrapper>
}