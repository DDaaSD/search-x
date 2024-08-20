import React from 'react'
import styled from 'styled-components'

const SuggestionsList = styled.div`    
    border-radius: 4px;
    max-width: 600px;
    margin-top: 8px;
    padding: 0;
    list-style: none;
    background-color: #fff;
`

const SuggestionItem = styled.div`
    padding: 20px 10px;
`

const Title = styled.h3`
    margin: 0;
    font-size: 16px;
    color: #007bff;
    cursor: pointer;
`

const Description = styled.p`
    margin: 5px 0 0;
    color: #666;
`

interface Suggestion {
    id: string;
    title: string;
    description: string;
    url: string;
}

interface SuggestedListProps {
    suggestions: Suggestion[];
    onSelect: (url: string) => void;
}

export const SuggestedList: React.FC<SuggestedListProps> = ({ suggestions, onSelect }) => {
    return (
        <SuggestionsList>
            {suggestions.map(suggestion => (
                <SuggestionItem key={suggestion.id}>
                    <Title onClick={() => onSelect(suggestion.url)}>{suggestion.title}</Title>
                    <Description>{suggestion.description}</Description>
                </SuggestionItem>
            ))}
        </SuggestionsList>
    )
}
