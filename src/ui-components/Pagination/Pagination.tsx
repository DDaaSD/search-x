import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
`

const PageButton = styled.button<{ active?: boolean }>`
    padding: 5px 10px;
    margin: 0 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${({ active }) => (active ? '#007bff' : '#fff')};
    color: ${({ active }) => (active ? '#fff' : '#007bff')};
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: ${({ active }) => (active ? '#0056b3' : '#f0f0f0')};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <PaginationContainer>
            {pages.map(page => (
                <PageButton
                    key={page}
                    onClick={() => onPageChange(page)}
                    active={page === currentPage}
                >
                    {page}
                </PageButton>
            ))}
        </PaginationContainer>
    )
}