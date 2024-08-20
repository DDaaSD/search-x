import React from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../SearchIcon/SearchIcon'
import { HistoryIcon } from '../HistoryIcon/HistoryIcon'
import { LinkSuggestion } from '../../types/LinkSuggestion'
import { RemoveIcon } from '../RemoveIcon/RemoveIcon'

type DropdownItemProps = {
    suggestedItem: LinkSuggestion
    onClick: () => void
    onRemove: (id: LinkSuggestion) => void
    isActive?: boolean

}

const ItemContainer = styled.div<{ $isActive: boolean }>`
    padding: 12px 16px;
    background-color: ${({ $isActive }) => ($isActive ? '#f1f3f4' : '#ffffff')};
    &:hover {
        background-color: #f1f3f4;
    }
    display: flex;
    align-items: center;
    justify-content: space-between; /* Added to space between content */
    border-bottom: 1px solid #e0e0e0;
`

const Content = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div<{ $isRecent: boolean }>`
    font-size: 16px;
    font-weight: 500;
    color: ${({ $isRecent }) => ($isRecent ? '#9a00ff' : '#202124')};
`

const Description = styled.div`
    font-size: 14px;
    color: #70757a;
    margin-top: 2px;
`

const StyledSearchIcon = styled.div`
    margin-right: 10px;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 0.8;
    }
`

export const DropdownItem: React.FC<DropdownItemProps> = ({ suggestedItem, onClick, onRemove, isActive = false, }) => {
    const { title, description, isRecent = false } = suggestedItem

    return (
        <ItemContainer $isActive={isActive} onClick={onClick}>
            <Content>
                <StyledSearchIcon>
                    {isRecent ? <HistoryIcon /> : <SearchIcon />}
                </StyledSearchIcon>
                <div>
                    <Title $isRecent={isRecent}>{title}</Title>
                    <Description>{description}</Description>
                </div>
            </Content>
            {isRecent && <CloseButton
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove(suggestedItem)
                }}
            >
                <RemoveIcon size={15} />
            </CloseButton>}
        </ItemContainer>
    )
}